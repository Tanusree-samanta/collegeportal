import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  User,
  Radio,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Send,
  Info,
} from 'lucide-react';
import { pcmToBase64, base64ToFloat32PCM } from '../utils/audioUtils';

interface VoiceConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageEntry {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const VoiceConversationModal: React.FC<VoiceConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasMic, setHasMic] = useState<boolean | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('Initializing Live Session...');
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');

  // Audio References
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);
  const isMicMutedRef = useRef(isMicMuted);
  const isSpeakerMutedRef = useRef(isSpeakerMuted);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync refs with state
  useEffect(() => {
    isMicMutedRef.current = isMicMuted;
  }, [isMicMuted]);

  useEffect(() => {
    isSpeakerMutedRef.current = isSpeakerMuted;
  }, [isSpeakerMuted]);

  // Auto-scroll transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect on modal open
  useEffect(() => {
    if (isOpen) {
      startVoiceSession();
    } else {
      stopVoiceSession();
    }
    return () => {
      stopVoiceSession();
    };
  }, [isOpen]);

  const startVoiceSession = async () => {
    setIsConnecting(true);
    setErrorMsg(null);
    setStatusText('Connecting to Dr. Neotia AI via Gemini 3.8 Live...');

    try {
      // 1. Initialize Output Audio Context (24 kHz for Gemini 3.8 Live audio output)
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const outputCtx = new AudioCtx({ sampleRate: 24000 });
      if (outputCtx.state === 'suspended') {
        await outputCtx.resume();
      }
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = 0;

      // 2. Safely attempt to initialize Microphone Capture
      let stream: MediaStream | null = null;
      let micAvailable = false;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Attempt standard constraints with noise suppression
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });
          micAvailable = true;
        } catch (e1: any) {
          try {
            // Fallback to basic audio: true
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micAvailable = true;
          } catch (e2: any) {
            console.warn('[Live Client] Microphone not available or requested device not found:', e2?.message || e2);
            micAvailable = false;
          }
        }
      }

      setHasMic(micAvailable);
      mediaStreamRef.current = stream;

      let inputCtx: AudioContext | null = null;
      if (micAvailable && stream) {
        try {
          inputCtx = new AudioCtx();
          inputAudioCtxRef.current = inputCtx;
        } catch (ctxErr) {
          console.warn('[Live Client] Could not create input AudioContext:', ctxErr);
        }
      }

      // 3. Connect to Backend WebSocket
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnecting(false);
        setIsConnected(true);

        if (micAvailable && stream && inputCtx) {
          setStatusText('Connected to Gemini 3.8 Live • Listening for voice...');

          // Setup audio processor
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessorRef.current = processor;

          source.connect(processor);
          processor.connect(inputCtx.destination);

          const sampleRate = inputCtx.sampleRate;

          processor.onaudioprocess = (e) => {
            if (isMicMutedRef.current) return;
            if (ws.readyState !== WebSocket.OPEN) return;

            const channelData = e.inputBuffer.getChannelData(0);

            // Detect audio energy for user visualizer
            let sum = 0;
            for (let i = 0; i < channelData.length; i++) {
              sum += channelData[i] * channelData[i];
            }
            const rms = Math.sqrt(sum / channelData.length);
            setIsUserSpeaking(rms > 0.02);

            // Resample to 16000Hz PCM and send to server
            const base64Audio = pcmToBase64(channelData, sampleRate);
            ws.send(JSON.stringify({ audio: base64Audio }));
          };
        } else {
          setStatusText('Connected to Gemini 3.8 Live • Dr. Neotia AI will speak responses');
        }
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.error) {
            setErrorMsg(msg.error);
            setStatusText('Connection error encountered');
            return;
          }

          if (msg.connected) {
            if (micAvailable) {
              setStatusText('Dr. Neotia AI is online • Listening for your voice...');
            } else {
              setStatusText('Dr. Neotia AI is online • Ask anything to hear spoken answers.');
            }
          }

          // Handle audio playback
          if (msg.audio && !isSpeakerMutedRef.current) {
            playAudioChunk(msg.audio);
          }

          // Handle speech interruption
          if (msg.interrupted) {
            stopCurrentAudioPlayback();
            setIsModelSpeaking(false);
            setStatusText('Interrupted • Listening...');
          }

          // Handle text transcriptions
          if (msg.text) {
            appendMessage(msg.role || 'model', msg.text);
          }

          if (msg.turnComplete) {
            setIsModelSpeaking(false);
            if (micAvailable) {
              setStatusText('Listening for your question...');
            } else {
              setStatusText('Dr. Neotia AI ready • Type or tap inquiries.');
            }
          }
        } catch (err) {
          console.error('[Live Client] Error parsing message:', err);
        }
      };

      ws.onerror = (e) => {
        console.error('[Live Client] WebSocket error:', e);
        setErrorMsg('Failed to connect to the Live API server. Ensure the server is running.');
        setIsConnecting(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        setStatusText('Session disconnected');
      };
    } catch (err: any) {
      console.error('[Live Client] Setup error:', err);
      setIsConnecting(false);
      setErrorMsg(err.message || 'Could not start voice session.');
    }
  };

  const playAudioChunk = (base64Data: string) => {
    const ctx = outputAudioCtxRef.current;
    if (!ctx) return;

    try {
      const float32Data = base64ToFloat32PCM(base64Data);
      const audioBuffer = ctx.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime + 0.03; // small buffer to avoid underrun
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      activeSourcesRef.current.push(source);
      setIsModelSpeaking(true);
      setStatusText('Dr. Neotia AI is speaking...');

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
        if (activeSourcesRef.current.length === 0) {
          setIsModelSpeaking(false);
        }
      };
    } catch (err) {
      console.error('[Live Client] Error playing audio chunk:', err);
    }
  };

  const stopCurrentAudioPlayback = () => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // already stopped
      }
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  };

  const stopVoiceSession = () => {
    stopCurrentAudioPlayback();

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setIsModelSpeaking(false);
    setIsUserSpeaking(false);
  };

  const appendMessage = (role: 'user' | 'model', text: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === role) {
        return [
          ...prev.slice(0, -1),
          { ...last, text: last.text + ' ' + text.trim() },
        ];
      }
      return [
        ...prev,
        {
          id: Date.now().toString() + Math.random(),
          role,
          text: text.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ];
    });
  };

  const sendTextMessage = (textToSend: string) => {
    if (!textToSend.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    appendMessage('user', textToSend.trim());
    wsRef.current.send(JSON.stringify({ text: textToSend.trim() }));
    setTextInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="glass-panel max-w-xl w-full shadow-2xl flex flex-col overflow-hidden max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        style={{ background: 'rgba(255, 255, 255, 0.90)', backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className="bg-white/80 border-b border-[#D9CC86]/45 px-4 sm:px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D83232] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif-tnu font-bold text-sm sm:text-base text-[#292727]">
                  Dr. Neotia AI • Live Voice Advisor
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live API
                </span>
              </div>
              <span className="text-[11px] text-[#765331] font-medium flex items-center gap-1.5">
                <span>Model: gemini-3.8-live</span>
                <span>•</span>
                <span>The Neotia University</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-[#765331] hover:text-[#292727] hover:bg-[#F2ECE4] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Voice Visualizer Orb */}
        <div className="bg-gradient-to-b from-white to-[#FAF8F5] border-b border-[#EBE6DF] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Animated Glow Wave */}
          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 relative ${
              isModelSpeaking
                ? 'bg-[#D83232]/15 scale-110 shadow-[0_0_40px_rgba(216,50,50,0.35)]'
                : isUserSpeaking
                ? 'bg-[#B69A62]/20 scale-105 shadow-[0_0_30px_rgba(182,154,98,0.3)]'
                : 'bg-[#F2ECE4] scale-100'
            }`}
          >
            {/* Inner Ring */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                isModelSpeaking
                  ? 'border-[#D83232] bg-[#D83232] text-white animate-pulse'
                  : isUserSpeaking
                  ? 'border-[#B69A62] bg-[#B69A62] text-white'
                  : 'border-[#D9CC86] bg-white text-[#765331]'
              }`}
            >
              {isModelSpeaking ? (
                <Radio className="w-8 h-8 animate-spin" />
              ) : isUserSpeaking ? (
                <Mic className="w-8 h-8 animate-bounce" />
              ) : (
                <Bot className="w-8 h-8" />
              )}
            </div>
          </div>

          {/* Live Status Description */}
          <div className="mt-3 flex flex-col items-center">
            <span className="text-xs sm:text-sm font-bold text-[#292727]">
              {statusText}
            </span>
            <span className="text-[11px] text-[#765331] mt-0.5">
              {hasMic
                ? 'Speak naturally into your microphone to discuss faculty posts, eligibility & pay scale'
                : 'Dr. Neotia AI speaks answers aloud. Type or click topics below.'}
            </span>
          </div>

          {/* Microphone Notice when not found */}
          {hasMic === false && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-[11px] flex items-center gap-2 max-w-md text-left">
              <Info className="w-4 h-4 shrink-0 text-amber-700" />
              <span className="flex-1">
                Microphone not detected. Voice output is enabled; you can type or select inquiries below to hear Dr. Neotia AI reply.
              </span>
              <button
                type="button"
                onClick={startVoiceSession}
                className="px-2 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded text-[10px] font-bold cursor-pointer shrink-0"
              >
                Check Mic
              </button>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mt-3 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2 max-w-md text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="flex-1">{errorMsg}</span>
              <button
                type="button"
                onClick={startVoiceSession}
                className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Conversation Transcript Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[160px] max-h-[220px]">
          {messages.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#765331]">
              <HelpCircle className="w-8 h-8 mx-auto text-[#B69A62]/60 mb-1.5" />
              <p className="font-semibold text-[#292727]">Start the Voice Conversation</p>
              <p className="text-[11px] mt-0.5">
                {hasMic
                  ? 'Say "Hello Dr. Neotia" or click one of the suggested academic topics below.'
                  : 'Click any suggested topic below or type an inquiry to hear Dr. Neotia AI reply.'}
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 text-xs ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-[#D83232] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    TNU
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl p-2.5 shadow-2xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#292727] text-white rounded-tr-xs'
                      : 'bg-white border border-[#D9CC86]/50 text-[#292727] rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      m.role === 'user' ? 'text-white/60' : 'text-[#765331]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#765331] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Inquiries */}
        <div className="px-4 py-2 bg-white border-t border-[#EBE6DF] overflow-x-auto whitespace-nowrap flex items-center gap-1.5">
          {[
            'What are the vacancies in AI & ML?',
            'Explain the 7th CPC scale & seed grants.',
            'What are the minimum eligibility qualifications?',
            'Where is the Sarisha campus located?',
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendTextMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#D9CC86]/50 text-[#765331] hover:text-[#D83232] text-[11px] font-medium transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="bg-[#F2ECE4]/70 border-t border-[#EBE6DF] p-3 sm:p-4 flex items-center justify-between gap-3">
          {/* Text input fallback */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendTextMessage(textInput)}
              placeholder="Type an inquiry (Dr. Neotia will speak answers)..."
              className="w-full bg-white text-xs pl-3 pr-8 py-2 rounded-lg border border-[#D9CC86]/60 focus:outline-none focus:border-[#D83232]"
            />
            {textInput && (
              <button
                type="button"
                onClick={() => sendTextMessage(textInput)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#D83232] hover:text-[#C62828] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mic Toggle (only enabled if mic is available) */}
            {hasMic && (
              <button
                type="button"
                onClick={() => setIsMicMuted(!isMicMuted)}
                aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer border ${
                  isMicMuted
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white hover:bg-[#FAF8F5] text-[#292727] border-[#D9CC86]'
                }`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            {/* Speaker Toggle */}
            <button
              type="button"
              onClick={() => {
                if (!isSpeakerMuted) {
                  stopCurrentAudioPlayback();
                }
                setIsSpeakerMuted(!isSpeakerMuted);
              }}
              aria-label={isSpeakerMuted ? 'Unmute audio' : 'Mute audio'}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer border ${
                isSpeakerMuted
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white hover:bg-[#FAF8F5] text-[#292727] border-[#D9CC86]'
              }`}
            >
              {isSpeakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* End Call / Close */}
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-[#D83232] hover:bg-[#C62828] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanBarcode, Camera, Keyboard, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";

export default function ScanAttendancePage() {
  const { employee } = useAuth();
  const [scanMode, setScanMode] = useState<"camera" | "usb">("usb");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ type: 'success' | 'error'; message: string; time: string } | null>(null);
  const [location, setLocation] = useState<{ lat?: number; lng?: number } | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scanMode === "usb" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [scanMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scanMode === "usb" && document.activeElement !== inputRef.current && inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [scanMode]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  const playSuccessTone = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // ignore audio restrictions
    }
  };

  const submitScan = async (barcodeId: string, selfie?: string) => {
    setIsScanning(true);
    try {
      const response = await api.post('/attendance/scan', {
        barcodeId,
        device: navigator.platform || 'Web',
        browser: navigator.userAgent,
        location,
        selfie,
      });

      playSuccessTone();
      setScanResult({
        type: 'success',
        message: response.data.message || 'Attendance recorded successfully.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      if (scanMode === 'usb') {
        setBarcodeInput('');
      }
    } catch (error: any) {
      setScanResult({
        type: 'error',
        message: error?.response?.data?.message || 'Unable to record attendance. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      toast.error(error?.response?.data?.message || 'Scan failed.');
    } finally {
      setIsScanning(false);
      setTimeout(() => setScanResult(null), 6500);
    }
  };

  const handleUsbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = barcodeInput.trim() || employee?.barcodeId;
    if (!code) {
      toast.error('Please enter or scan your barcode.');
      return;
    }
    await submitScan(code);
  };

  const capture = useCallback(async () => {
    if (isScanning) return;
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    if (!employee?.barcodeId) {
      toast.error('Unable to determine barcode for camera scan.');
      return;
    }
    await submitScan(employee.barcodeId, imageSrc);
  }, [employee?.barcodeId, isScanning]);

  useEffect(() => {
    if (scanMode === 'camera') {
      const interval = setInterval(capture, 4000);
      return () => clearInterval(interval);
    }
  }, [scanMode, capture]);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Scan Attendance</h2>
        <p className="text-muted-foreground">Please scan your Barcode ID to mark your attendance.</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <button
          onClick={() => setScanMode('usb')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            scanMode === 'usb'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'glass-card text-foreground hover:bg-muted'
          }`}
        >
          <Keyboard size={20} /> USB Scanner
        </button>
        <button
          onClick={() => setScanMode('camera')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            scanMode === 'camera'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'glass-card text-foreground hover:bg-muted'
          }`}
        >
          <Camera size={20} /> Camera
        </button>
      </div>

      <div className="flex-1 glass-card rounded-3xl border border-border/50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <ScanBarcode size={400} />
        </div>

        <AnimatePresence mode="wait">
          {scanResult ? (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center text-center z-10 bg-background/80 backdrop-blur-md p-12 rounded-3xl border border-border shadow-2xl"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${scanResult.type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {scanResult.type === 'success' ? <CheckCircle2 size={48} /> : <AlertTriangle size={48} />}
              </div>
              <h3 className="text-3xl font-bold mb-2">{scanResult.time}</h3>
              <p className="text-xl font-medium text-muted-foreground">{scanResult.message}</p>
              <p className="mt-6 text-sm text-muted-foreground animate-pulse">Ready for next scan...</p>
            </motion.div>
          ) : (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-xl flex flex-col items-center z-10"
            >
              {scanMode === 'usb' ? (
                <div className="w-full flex flex-col items-center">
                  <div className="w-48 h-48 border-4 border-dashed border-primary/50 rounded-2xl relative flex items-center justify-center mb-8 bg-primary/5">
                    <ScanBarcode size={80} className="text-primary/40" />
                    <div className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(59,130,246,1)] z-20 animate-scan" />
                  </div>
                  <form onSubmit={handleUsbSubmit} className="w-full relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Keyboard size={20} className="text-muted-foreground" />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      placeholder={employee?.barcodeId ? 'Scan your assigned barcode or type it here...' : 'Enter barcode to scan...'}
                      className="w-full pl-12 pr-4 py-4 bg-background/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all text-center text-lg font-mono font-bold tracking-widest shadow-xl"
                      autoFocus
                      disabled={isScanning}
                    />
                  </form>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Click the input field and use your USB Barcode Scanner.<br />The scanner will automatically submit after hitting Enter.
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-border shadow-2xl bg-black">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: 'environment' }}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none flex items-center justify-center">
                      <div className="w-full h-full border-2 border-primary rounded-lg relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] z-20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    Hold your Barcode ID card steady inside the frame.<br />Scanning happens automatically every few seconds.
                  </p>
                </div>
              )}

              {isScanning && (
                <div className="mt-8 flex items-center gap-2 text-primary font-medium">
                  <Loader2 size={20} className="animate-spin" /> Processing scan...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

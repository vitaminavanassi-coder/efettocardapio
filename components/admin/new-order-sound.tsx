"use client";

import { useEffect, useRef } from "react";

type NewOrderSoundProps = {
  tick: number;
  patientName?: string;
};

export function NewOrderSound({ tick, patientName }: NewOrderSoundProps) {
  const previousTick = useRef(tick);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    function armAlerts() {
      const AudioContextClass = window.AudioContext;

      if (!AudioContextClass) {
        return;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      void audioContextRef.current.resume().catch(() => undefined);
    }

    window.addEventListener("admin-alerts-armed", armAlerts);

    return () => {
      window.removeEventListener("admin-alerts-armed", armAlerts);
    };
  }, []);

  useEffect(() => {
    if (tick <= previousTick.current) {
      return;
    }

    previousTick.current = tick;

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      const title = patientName ? `${patientName} fez um pedido` : "Novo pedido recebido";
      const body = patientName
        ? "A recepcao ja pode separar e entregar."
        : "Abra o painel para visualizar os itens.";

      void new Notification(title, { body });
    }

    const AudioContextClass = window.AudioContext;

    if (!AudioContextClass) {
      return;
    }

    const audioContext = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = audioContext;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    void audioContext.resume().catch(() => undefined);

    oscillator.type = "triangle";
    oscillator.frequency.value = 920;
    gainNode.gain.value = 0.06;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.24);

    return () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }, [patientName, tick]);

  return null;
}

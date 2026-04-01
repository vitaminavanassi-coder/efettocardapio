"use client";

import { useEffect, useRef } from "react";

type NewOrderSoundProps = {
  tick: number;
  patientName?: string;
};

export function NewOrderSound({ tick, patientName }: NewOrderSoundProps) {
  const previousTick = useRef(tick);

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

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.03;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);

    return () => {
      oscillator.disconnect();
      gainNode.disconnect();
      void audioContext.close();
    };
  }, [patientName, tick]);

  return null;
}

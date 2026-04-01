"use client";

import { useState } from "react";

type AlertsPermission = NotificationPermission | "unsupported";

function getInitialPermission(): AlertsPermission {
  if (typeof Notification === "undefined") {
    return "unsupported";
  }

  return Notification.permission;
}

export function AdminAlertsToggle() {
  const [permission, setPermission] = useState<AlertsPermission>(getInitialPermission);

  async function requestPermission() {
    window.dispatchEvent(new Event("admin-alerts-armed"));

    if (typeof Notification === "undefined") {
      return;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);
  }

  if (permission === "unsupported") {
    return null;
  }

  if (permission === "granted") {
    return (
      <div className="glass-chip-active inline-flex rounded-full px-4 py-2 text-sm font-medium text-[#8f4c24]">
        Alertas ativos
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="glass-chip inline-flex rounded-full px-4 py-2 text-sm font-medium text-[#8f4c24]">
        Libere as notificacoes no navegador
      </div>
    );
  }

  return (
    <button
      type="button"
      className="glass-button-primary inline-flex rounded-full px-4 py-2.5 text-sm font-medium text-white"
      onClick={requestPermission}
    >
      Ativar alertas
    </button>
  );
}

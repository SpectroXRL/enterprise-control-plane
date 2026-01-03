import { useEffect, useState } from "react";
import {
  meet,
  type MeetSidePanelClient,
} from "@googleworkspace/meet-addons/meet.addons";

const CLOUD_PROJECT_NUMBER = import.meta.env.VITE_MEET_CLOUD_PROJECT_NUMBER;
const MAIN_STAGE_URL = import.meta.env.VITE_MAIN_STAGE_URL;

if (!CLOUD_PROJECT_NUMBER || !MAIN_STAGE_URL) {
  throw new Error(
    "Missing VITE_MEET_CLOUD_PROJECT_NUMBER environment variable"
  );
}

export function SidePanel() {
  const [sidePanelClient, setSidePanelClient] =
    useState<MeetSidePanelClient | null>(null);

  // Launches the main stage when the button is clicked
  const startActivity = async () => {
    if (!sidePanelClient) {
      console.error("Side Panel is not yet initialized");
      return;
    }

    await sidePanelClient.startActivity({
      mainStageUrl: MAIN_STAGE_URL,
    });
  };

  // Initialize the add-on session and side panel client
  useEffect(() => {
    let mounted = true;

    (async () => {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber: CLOUD_PROJECT_NUMBER,
      });

      const client = await session.createSidePanelClient();

      if (mounted) {
        setSidePanelClient(client);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <div>This is the add-on Side Panel. Only you can see this.</div>

      <button
        onClick={startActivity}
        disabled={!sidePanelClient}
        style={{ marginTop: 12 }}
      >
        Launch Activity in Main Stage
      </button>
    </div>
  );
}

import { useEffect } from "react";
import { meet } from "@googleworkspace/meet-addons/meet.addons";

const CLOUD_PROJECT_NUMBER = import.meta.env.VITE_MEET_CLOUD_PROJECT_NUMBER;

if (!CLOUD_PROJECT_NUMBER) {
  throw new Error(
    "Missing VITE_MEET_CLOUD_PROJECT_NUMBER environment variable"
  );
}

export function MainStage() {
  /**
   * Prepares the add-on Main Stage Client, which signals that the add-on
   * has successfully launched in the main stage.
   */

  useEffect(() => {
    let mounted = true;

    (async () => {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber: CLOUD_PROJECT_NUMBER,
      });

      if (mounted) {
        await session.createMainStageClient();
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <div>
        This is the add-on Main Stage. Everyone in the call can see this.
      </div>
      <div>Hello, world!</div>
    </>
  );
}

export default MainStage;

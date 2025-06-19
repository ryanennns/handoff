import type { ReactNode } from "react";

export const StepWrapper = ({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) => (
  <>
    <div className="relative">
      <div className={enabled ? "" : "opacity-50"}>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-white">
          {children}
        </div>
      </div>
      {!enabled && (
        <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto" />
      )}
    </div>
  </>
);

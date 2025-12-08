import { RiveAnimation } from "@/components/RiveAnimation";

export default function TestRivePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Rive Animation Test</h1>

        <div className="space-y-8">
          {/* Mail Animation */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">mail.riv</h2>
            <div className="bg-white rounded-lg p-4">
              <RiveAnimation
                src="/mail.riv"
                stateMachineName="Mail"
                className="w-full h-[400px]"
              />
            </div>
          </div>

          {/* Twitter Animation */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">twitter.riv</h2>
            <div className="bg-white rounded-lg p-4">
              <RiveAnimation
                src="/twitter.riv"
                stateMachineName="Twitter"
                className="w-full h-[400px]"
              />
            </div>
          </div>

          {/* Open GitHub Animation */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">open-github.riv</h2>
            <div className="bg-white rounded-lg p-4">
              <RiveAnimation
                src="/open-github.riv"
                className="w-full h-[400px]"
              />
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Testing Instructions:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>The animations should load and play automatically</li>
              <li>Check browser console for any errors</li>
              <li>Try interacting with the animations (hover, click)</li>
              <li>Verify the animations loop correctly</li>
              <li>Test responsiveness by resizing the browser window</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Requirements() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="w-[80%] max-w-lg">
        <h2 className="mb-8 text-3xl font-extrabold text-center">Requirements</h2>

        <div className="mb-8">
          <h3 className="mb-3 text-xl font-bold text-gray-800">Functional Requirements:</h3>
          <ul className="space-y-2 pl-6 list-disc text-gray-700">
            <li>Allow users to tweet messages up to <strong>140 characters</strong>.</li>
            <li>Enable users to <strong>follow</strong> other users.</li>
            <li>Allow users to <strong>like</strong> tweets from other users.</li>
            <li>Display tweets from followed users in the <strong>home feed</strong>.</li>
            <li>Show <strong>top K popular tweets</strong> in the home feed based on likes and followers.</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-bold text-gray-800">Non-Functional Requirements:</h3>
          <ul className="space-y-2 pl-6 list-disc text-gray-700">
            <li><strong>Low Latency:</strong> Feed generation and posting should be fast.</li>
            <li><strong>High Scalability:</strong> Must handle millions of concurrent users and a high read-to-write ratio.</li>
            <li><strong>High Reliability:</strong> The system should not lose tweets and remain highly available.</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
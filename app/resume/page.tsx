import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Resume() {
  return (
    <div className={`min-h-screen bg-white text-black p-8 ${inter.className}`}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">John Peng</h1>
          <p className="text-gray-400">johnpeng47@gmail.com | (647) 206-3110 | Toronto, Canada</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium">Penetration Tester, Kroll (Formerly Security Compass)</h3>
            <p className="text-gray-400 mb-2">July 2018 - Jan 2023</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Led pentests against a variety of standard targets including web-app, cloud, mobile and network</li>
              <li>Executed bespoke engagement types, including binary fuzzing, red team and social engineering</li>
              <li>Wrote internal tooling such as a XOR-based string obfuscator for binary payloads and an automated IAM testing tool (AWS)</li>
              <li>Inculcated a mindset of true paranoia when it comes to designing secure web applications</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <p className="mb-4 text-gray-600">(What Ive been up to since I quit pentesting)</p>
          <div className="mb-6">
            <h3 className="text-xl font-medium">Cowboy (Automated Unit Test Generator)</h3>
            <p className="text-gray-400 mb-2">
              <a href="https://github.com/JohnPeng47/cowboy-server/tree/for_lauren">Server Code</a>
              <a>, </a>
              <a href="https://github.com/JohnPeng47/cowboy.git">Client Code</a>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Automated unit test generator for Python inspired by <a href="https://arxiv.org/abs/2402.09171">similar initiative </a> at Meta</li>
              <li>Uses a novel coverage diffing algorithm to build a test / src mapping, which is then used as context to guide test generation</li>
              <li>Web server written in Python/FastAPI/MongoDB with Python cli client and ReactJS component</li>
              <li>Allows for automated, large-scale unit test augmentation, with human interaction only for approving test cases</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-medium">CodeSearch </h3>
            <p className="text-gray-400 mb-2"><a href="https://cowboy.rocks/codesearch">https://cowboy.rocks/codesearch</a></p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Web app for full repo summarization aimed at increasing the initial effectiveness of in-browser code browsing</li>
              <li>Uses a novel approach for clustering chunks of code inspired by <a href="https://github.com/microsoft/graphrag">GraphRAG</a> using a code dependency graph</li>
              <li>Takes advantage of OpenAI prompt cahing by batching LLM requests</li>
              <li>Have created a set of LLM evaluations to guide quick and robust iterations on prompt performance, using both model critics as well as deterministic metrics (ie. Rand index for scoring cluster similarity) </li>
              <li>Web server written in Python/FastAPI/SQL along with ReactJS client</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-medium">Topic Explorer </h3>
            <p className="text-gray-400 mb-2"><a href="https://cowboy.rocks/TopicExplorer?query=character%20and%20themes%20of%20doystevsky%27s%20the%20idiot">https://cowboy.rocks/TopicExplorer</a></p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Hobbyist project exploring a different UI primitive for search</li>
              <li>UI mimics the structure of the base prompt itself, which recursively expands itself into different subtopic levels nodes of a 
                <a className="font-medium font-bold text-white" href="https://x.com/theRealJohnPeng/status/1831776651031801921"><b> hierarchal tree</b></a></li>
              <li>Web server written in Python/FastAPI/SQL along with ReactJS client using ReactFlow</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <h3 className="text-xl font-medium">Software Engineering, McMaster University</h3>
          <p className="text-gray-400">2018</p>
        </section>
      </div>
    </div>
  );
}

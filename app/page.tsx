import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Resume() {
  return (
    <div className={`min-h-screen bg-[#121212] text-white p-8 ${inter.className}`}>
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
            <ul className="list-disc list-inside text-gray-300">
              <li>Led and participated in pentests against a variety of standard targets including web-app, cloud, mobile and network</li>
              <li>Executed bespoke engagement types, including binary fuzzing against the heap allocator of a graphics occlusion library and red team engagements</li>
              <li>Inculcated a mindset of true paranoia when it comes to designing secure web applications</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <p className="mb-4 text-gray-300">(What Ive been up to since I quit my job)</p>
          <div className="mb-6">
            <h3 className="text-xl font-medium">Cowboy (Automated Unit Test Generator)</h3>
            <p className="text-gray-400 mb-2">
              <a href="https://github.com/JohnPeng47/cowboy-server/tree/for_lauren">Server Code</a>
              <a>, </a>
              <a href="https://github.com/JohnPeng47/cowboy.git">Client Code</a>
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Basically implemented <a className="font-medium font-bold text-white" href="https://news.ycombinator.com/item?id=39405996"><b>this</b></a> for Python, and extensible to other
                lanuages with TreeSitter support
              </li>
              <li>Uses special home-brewed, coverage diffing algorithm to build test/src file mapping</li>
              <li>Then do rounds of unit test "augmentation" (extending existing unit tests instead of generating new tests wholesale) using 
                the src file mapping as additional context to the LLM to guide generation
              </li>
              <li>Empirically tested that adding src context improves coverage of augmented tests by significant margin</li>
              <li>Allows for automated, large-scale unit test augmentation, with human interaction only for approving test cases</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-medium">Topic Explorer <span className="text-sm text-gray-400 italic">source code available upon request</span></h3>
            <p className="text-gray-400 mb-2"><a href="https://cowboy.rocks/TopicExplorer?query=character%20and%20themes%20of%20doystevsky%27s%20the%20idiot">https://cowboy.rocks/TopicExplorer</a></p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Recursively expand into deeper subtopic levels using a single prompt representing a 
                <a className="font-medium font-bold text-white" href="https://x.com/theRealJohnPeng/status/1831776651031801921"><b> hierarchal tree</b></a> of topics</li>
              <li>First part of an experimental, AI-first document writing flow</li>
              <li>TBR: Generating paragraphs/sections from the list of topics piecemeal</li>
              <li>TBR: Taking the generated paragraphs from above and composing them into a full-fledged document</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-medium">CodeSearch <span className="text-sm text-gray-400 italic">source code available upon request</span></h3>
            <p className="text-gray-400 mb-2"><a href="https://cowboy.rocks/codesearch">https://cowboy.rocks/codesearch</a></p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Generates summaries for code clusters created from graph-based clustering algo on a dependency graph over RAG-style code chunking</li>
              <li>TBR: Naive semantic search over chunked code embeddings </li>
              <li>TBR: Incorporating summary chunk into semantic code search</li>
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

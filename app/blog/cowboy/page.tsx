import { 
    Article,
    ArticleHeader,
    CodeBlock, 
    Section, 
    Paragraph, 
    UnorderedList, 
    OrderedList, 
    ListItem 
} from "@/app/components/article"
import { blogPosts } from "@/app/blog/all-posts"

export default function Cowboy() {
  const post = blogPosts.find(post => post.slug === "cowboy")!

  return (
    <Article>
      <ArticleHeader
        title={post.title}
        date={post.date}
        author={post.author}
        subheading={post.subheading}
      />

      <Section>
        <Paragraph>
          I don&apos;t like writing tests.
        </Paragraph>
        <Paragraph>
          Nobody likes writing tests? With LLMs, I thought there was a way to automate a large part of testing out of software development. 
          So today I am open-sourcing <a href="https://github.com/JohnPeng47/cowboy"><u>Cowboy</u></a>, mankind&apos;s first step towards full unit test automation.
        </Paragraph>
        <Paragraph>
          <em>
            Currently it is limited to only extending existing test suites because this is easier and gives us a reliable baseline
            performance for further performance in future designs (more on this here).
          </em>
        </Paragraph>
      </Section>
      <Section>
        <h2 className="text-2xl font-bold mt-8 mb-4">How it works</h2>
        <Paragraph>The main loop in Cowboy goes something like this:</Paragraph>
        <OrderedList>
          <ListItem>Iterate through all existing test suites in your current repo</ListItem>
          <ListItem>Pass its context into a LLM test-generating prompt</ListItem>
          <ListItem>Generate a set of tests</ListItem>
          <ListItem>Run coverage on the set of tests to ensure that they improve coverage</ListItem>
        </OrderedList>
        <Paragraph>
          The current prompt that Cowboy uses is quite simple, and only uses two pieces context:
        </Paragraph>
        <CodeBlock>
          {`Given this piece of source code:
{source_code}

And these existing tests written for it:
{existing_tests}

Come up with some new tests that improves coverage`}
        </CodeBlock>

        <Paragraph>
          Of the two pieces of contexts above, getting the "existing_tests" is pretty straight-forward. However,
          figuring out what to include for the "source_file" context proved to be a little bit tricky
        </Paragraph>
      </Section>
      <Section>
        <h2 className="text-2xl font-bold mt-8 mb-4">Setup Coverage Collection</h2>
        <Paragraph>
          The initial idea was to use coverage information to figure this out, since coverage data tells us the line of source code executed by individual tests.
        </Paragraph>
        <Paragraph>
          However, problem soon presents itself. Most (all?) test runners (ie. Pytest, Grunt, Junit, etc.) will only give you line coverage for
          *all* the lines that are covered when running the test. This includes alot of extra lines that sets up the program state for test execution, but have
          nothing to do with the file that the test is meant to cover. We could include all of them in our prompt, and pray that
          the LLM can sift through hundreds of useless lines to find <em>The One File</em> ... or we can try to solve this problem with code. 
        </Paragraph>

        <Paragraph>
          The first way I went about to solve this is by taking the difference between the set of all lines covered by a test suite (mod_cov)
          and the total set with all the tests (base_cov). Here is a simple example to illustrate this.
        </Paragraph>

        <CodeBlock>
          {`base_cov -> [1,2,3,4,5] -------: f1.py
mod_cov -> [3,4,5] ------------: f1.py # (this is unknown)
base_cov - mod_cov -> [1,2] ---: f1.py # (this is known, by deselecting its tests)
base_cov - (base_cov - mod_cov) = mod_cov   # aha mod_cov covers line [3,4,5] of f1.py`}
        </CodeBlock>

        <Paragraph>
          Note: We have to first calculate <em>base_cov - mod_cov</em> by deselecting all the tests from the test suite (I did this in Pytest, but assume other test runners 
          implement a very similar API). 
          Then, when we take its difference from base_cov, what remains are the set of lines that are only covered by mod_cov.
        </Paragraph>

        <Paragraph>
          The example above is actually an ideal case because alot of times, the set of source lines 
          covered by mod_cov will likely have overlap with another test in base_cov, which means that 
          deselecting the test in base_cov - mod_cov will not work; the test will still run because of its inclusion in base_cov.
          For example, if t1 and t2 both cover lines [1,2,3] in f1, only deselecting t1 means that these lines are still executed on account of t2.
        </Paragraph>
        <Paragraph>
          To get coverage diffing to work, I had to find a way to remove all the irrelevant source lines while using a base
          that has minimum overlaps. The final solution that I ended up with still took the general form:
        </Paragraph>
        <CodeBlock>
          {`cov1 - (cov1 - cov2)`}
        </CodeBlock>
        <Paragraph>
          But:
        </Paragraph>
        <UnorderedList>
          <ListItem>Instead of using base_cov for cov1, I use mod_cov, that is the test suite coverage</ListItem>
          <ListItem>Instead of using mod_cov for cov2 in (cov1 - cov2), I replaced cov2 with the coverage of the <em>test suite with a single test deselected</em></ListItem>
          <ListItem>I then do this for all the tests in the test suite</ListItem>
        </UnorderedList>

        <Paragraph>The new algorithm looks something like this:</Paragraph>
        <CodeBlock>
          {`mod_cov - sum([mod_cov - test for test in mod.tests])`}
        </CodeBlock>

        <Paragraph>
          Now, instead of the potential coverage overlap being between all the test suite and the entire repo, we now only 
          have to consider the overlap between a tests in a single test suite. This allows us to pinpoint which lines of source files are uniquely
          covered by tests, allowing us to construct the "source_file" context while minimizing the number of unrelated files.
        </Paragraph>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mt-8 mb-4">Check it out</h2>
        <Paragraph>
        https://github.com/JohnPeng47/cowboy
        </Paragraph>
      </Section>  
    </Article>
  )
}
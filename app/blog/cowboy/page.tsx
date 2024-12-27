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
import { blogPosts } from "@/lib/posts"

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
          I don&apos;t like writing tests. Nobody likes writing tests? With LLMs, I thought there was a way to automate a large part of testing out of software development. Which is to say, Cowboy in its current form does not go 100% in the way of liberating us from the drudgery of test writing.
        </Paragraph>

        <Paragraph>
          It can currently only extend existing unit test suites, a limitation that exists because:
        </Paragraph>
        <OrderedList>
          <ListItem>Getting the setup code for tests to work can be quite tricky</ListItem>
          <ListItem>Without example code, the LLM is liable to generate code that is ostensibly correct but completely out of wack with the style/standards used in the rest of the tests</ListItem>
        </OrderedList>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mt-8 mb-4">How it works</h2>
        <Paragraph>The main loop in Cowboy goes something like this:</Paragraph>
        <OrderedList>
          <ListItem>Iterate through all TestModules (a collection of tests, this is either a whole file or a class with unit tests implemented as its methods) in your current repo</ListItem>
          <ListItem>Pass its context into a LLM test-generating prompt</ListItem>
          <ListItem>Generate a set of tests</ListItem>
          <ListItem>Run coverage on the set of tests to ensure that they improve coverage</ListItem>
        </OrderedList>

        <CodeBlock>
          {`Given this piece of source code:
{source_code}

And these existing tests written for it:
{existing_tests}

Come up with some new tests that improves coverage`}
        </CodeBlock>

        <Paragraph>
          Of the two pieces of contexts above, getting the source_file that is uniquely covered by a particular test case actually proved to be quite tricky
        </Paragraph>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mt-8 mb-4">Setup Coverage Collection</h2>
        <Paragraph>
          Most (all?) test runners (ie. Pytest, Grunt, Junit, etc.) will only give you line coverage for all the lines that are covered when running the test. Unless the source file under test is abnormally isolated, chances are they will have dependencies on other source files, which will get pulled into the test coverage. And placing all of the source files into the prompt context is:
        </Paragraph>

        <OrderedList>
          <ListItem>More likely to exceed the context length</ListItem>
          <ListItem>Confuse the LLM on which source file is meant to be covered under by the test</ListItem>
        </OrderedList>

        <Paragraph>
          The first way I went about to solve this is by subtracting (set difference) the base coverage (coverage of whole repo) by the base coverage subtracted by module coverage (coverage of a single TestModule) deselected:
        </Paragraph>

        <CodeBlock>
          {`base_cov -&gt; [1,2,3,4,5] -------: f1.py
mod_cov -&gt; [3,4,5] ------------: f1.py
base_cov - mod_cov -&gt; [1,2] ---: f1.py
base_cov - (base_cov - mod_cov) = mod_cov   # aha mod_cov covers line [1,2] of f1.py`}
        </CodeBlock>

        <Paragraph>
          (note: the value of mod_cov cannot be recovered directly, since we can only deselect tests, so we only know base_cov and (base_cov - mod_cov) beforehand).
        </Paragraph>

        <Paragraph>
          The example above is actually an ideal case because in alot of cases, the set of source lines covered by mod_cov will likely be covered another test that a part of base_cov. So this won&apos;t work, at least not well enough for us to generalize. The next solution I found, and which is currently the one that I am implementing in Cowboy, is to take the same coverage diffing principal from before, but this time, in a way that has less overlap between [cov1,cov2] in cov1 - (cov1 - cov2).
        </Paragraph>

        <UnorderedList>
          <ListItem>instead of using base_cov for cov1, I use mod_cov</ListItem>
          <ListItem>instead of using mod_cov for cov1 - cov2, I use mod_cov - test_i_cov, the TestModule coverage with test i deselected</ListItem>
        </UnorderedList>

        <Paragraph>then I do:</Paragraph>

        <CodeBlock>
          {`total_cov;
for i in len(tests):
  total_cov += mod_cov - (mod_cov - test_{i}_cov)`}
        </CodeBlock>

        <Paragraph>
          So now, instead of the potential coverage overlap being between all the tests inside TestModule and all the test in the whole repo, we now only have to consider overlap between a single test in TestModule and all the other tests in TestModule.
        </Paragraph>
      </Section>
    </Article>
  )
}
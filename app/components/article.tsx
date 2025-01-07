import React from "react";  

interface CodeBlockProps {
    children: string;
    className?: string;
}

interface ComponentProps {
    children: React.ReactNode;
    className?: string;
}

interface ArticleHeaderProps {
    title: string;
    date: string;
    author: string;
    subheading?: string;
}
export function ArticleHeader({ title, date, author, subheading }: ArticleHeaderProps) {
    return (
        <header className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {subheading && (
                <p className="text-xl text-gray-400 mb-2">{subheading}</p>
            )}
            <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-4">By {author}</span>
                <time>{date}</time>
            </div>
        </header>
    );
}

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
    return (
        <div className={`code-block bg-gray-100 p-4 rounded-lg mb-6 ${className}`}>
            <pre className="code-block__content font-mono text-sm text-gray-900">
                {children}
            </pre>
        </div>
    );
}

export function Section({ children, className = "" }: ComponentProps) {
    return (
        <section className={`content-section mb-8 ${className}`}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === "h2") {
                    const headerText = child.props.children?.toString() || "";
                    const id = headerText.toLowerCase().replace(/\s+/g, "-");
                    
                    return (
                        <div className="group">
                            <div className="flex items-center">
                                <a href={`#${id}`} className="no-underline">
                                    <h2 id={id} className={`${child.props.className || ""} hover:cursor-pointer m-0`}>
                                        {headerText}
                                    </h2>
                                </a>
                                <div className="flex-1">
                                    <span className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400">
                                        #
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }
                return child;
            })}
        </section>
    );
}

export function Paragraph({ children, className = "" }: ComponentProps) {
    return (
        <p className={`content-paragraph mb-6 ${className}`}>
            {children}
        </p>
    );
}

export function UnorderedList({ children, className = "" }: ComponentProps) {
    return (
        <ul className={`unordered-list list-disc pl-6 mb-6 ${className}`}>
            {children}
        </ul>
    );
}

export function OrderedList({ children, className = "" }: ComponentProps) {
    return (
        <ol className={`ordered-list list-decimal pl-6 mb-6 ${className}`}>
            {children}
        </ol>
    );
}

export function ListItem({ children, className = "" }: ComponentProps) {
    return (
        <li className={`list-item ${className}`}>
            {children}
        </li>
    );
}

export function Article({ children }: { children: React.ReactNode }) {
    return (
        <article className="article max-w-3xl mx-auto px-4 py-16 prose lg:prose-xl">
            {children}
        </article>
    );
}
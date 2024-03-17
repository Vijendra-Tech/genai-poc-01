import { GithubRepoLoader } from "langchain/document_loaders/web/github";
// Peer dependency, used to support .gitignore syntax
import ignore from "ignore";

export async function loadgithubFiles() {
    const loader = new GithubRepoLoader(
        "https://github.com/Vijendra-Tech/genai-poc-01",
        { recursive: true, ignorePaths: ["*.md", "package-lock.json"] }
    );
    const docs = await loader.load();
    console.log('files',docs);
    return docs
    
}
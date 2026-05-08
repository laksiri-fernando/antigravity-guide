# Antigravity Guide

A comprehensive guide to getting started with **Google Antigravity** — an AI-powered, agent-first Integrated Development Environment (IDE) built by Google. Antigravity is a modified fork of Visual Studio Code, featuring a dual-interface with an **Editor View** for hands-on coding and an **Agent Manager** for orchestrating autonomous AI agents.

---

## Prerequisites

Before installing Google Antigravity, ensure your system meets the following requirements:

| Requirement       | Details                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| **Operating System** | Windows 10/11 (64-bit), macOS Monterey 12+, or Linux (glibc 2.28+)  |
| **Account**          | A personal Gmail account (required for public preview access)        |
| **Browser**          | Google Chrome (needed for browser agent integration)                 |
| **RAM**              | Minimum 8 GB (16 GB recommended)                                    |

---

## Installation

1. **Download the installer**
   Visit the official website at [antigravity.google](https://antigravity.google) and download the installer for your operating system.

2. **Run the installer**
   Open the downloaded file and follow the standard installation prompts for your platform:
   - **Windows:** Run the `.exe` installer and follow the setup wizard.
   - **macOS:** Open the `.dmg` file and drag Antigravity to your Applications folder.
   - **Linux:** Extract the archive and run the provided install script.

---

## Setup

1. **First launch & setup wizard**
   Upon first launch, you will be guided through a setup wizard where you can:
   - **Start fresh** or **import existing settings/extensions** from Visual Studio Code or similar editors.

2. **Sign in**
   Sign in with your personal **Gmail account** when prompted. This is required to access the AI features.

3. **Configure development modes**
   Select your preferred development mode in the Agent Manager. This determines how much autonomy the AI agents have when performing tasks.

4. **Install Chrome extension** *(optional)*
   If you plan to use browser-based agent tasks, you will be prompted to install the **Chrome extension** that allows agents to verify UI changes and run browser tests.

---

## Usage

### Editor View

Functions similarly to a standard VS Code editor. It provides:
- **AI-powered tab completion** — Intelligent code suggestions as you type.
- **Inline commands** — Quick AI-assisted actions directly in your code.

### Agent Manager

Acts as your **"Mission Control"** dashboard. Use it to:
- **Spawn agents** — Start autonomous agents for complex tasks.
- **Monitor progress** — Track agent activity across editor, terminal, and browser.
- **Interact & provide feedback** — Guide agents with additional instructions mid-task.

Example tasks you can assign to agents:
- Refactoring modules
- Writing unit tests
- Updating dependencies
- Building and verifying UI components

Launch Agent Manager
- Press "Open Agent Manager" button from the title bar
- Or press Ctrl + E

### Browser Integration

Launch browser-dependent tasks from the Agent Manager. Agents can:
- Open and interact with web pages.
- Verify UI changes visually.
- Run end-to-end tests in the browser.

### Artifacts

As agents work, they generate **Artifacts** — structured, reviewable evidence of their work:
- **Implementation plans** — Step-by-step breakdown of the approach.
- **Task lists** — Trackable to-do items.
- **Browser recordings** — Visual proof of browser interactions.
- **Code diffs** — Clear view of all code changes made.

---

## Extensions

Since Antigravity is a VS Code fork, most VS Code extensions are compatible. However, there are some differences:

- **Default marketplace:** Antigravity uses the **OpenVSX registry** by default, so some extensions from the official VS Code Marketplace may not appear.
- **Switch to VS Code Marketplace:** Update the `Marketplace Gallery URL` and `Marketplace Item URL` in your settings to point to the official marketplace.
- **Manual installation:** Download the `.vsix` file from the VS Code Marketplace and install it via the Antigravity command-line interface.

> **Note:** Some proprietary extensions (e.g., C# Dev Kit) may not function due to licensing restrictions on third-party IDEs.

---

## Model Options

Antigravity supports multiple AI models for your tasks:
- **Gemini 3.1 Pro** — Google's flagship model
- **Gemini 3 Flash** — Fast, lightweight option
- **Claude Sonnet** — Anthropic's model family
- **Open-source models** — Various community options

---

## Rules and Workflows

Antigravity lets you customize agent behavior through **Rules** (persistent guidelines) and **Workflows** (reusable task sequences). Both are defined as simple Markdown files stored in your workspace.

### Directory Structure

Rules and workflows live inside a `.agents/` directory at the root of your workspace:

```
your-workspace/
├── .agents/
│   ├── rules/          # Workspace-level rules
│   │   ├── code-style-guide.md
│   │   └── code-generation-guide.md
│   └── workflows/      # Workspace-level workflows
│       ├── generate-unit-tests.md
│       └── summarize.md
```

> **Note:** Antigravity also supports the older `.agent/` directory for backward compatibility. The `.agents/` directory is the recommended default.

For **global** rules and workflows that apply across all your workspaces:

| Scope              | Location                                              |
| ------------------ | ----------------------------------------------------- |
| **Global Rule**    | `~/.gemini/GEMINI.md`                                 |
| **Global Workflow**| `~/.gemini/antigravity/global_workflows/<NAME>.md`    |
| **Workspace Rule** | `<workspace>/.agents/rules/<NAME>.md`                 |
| **Workspace Workflow** | `<workspace>/.agents/workflows/<NAME>.md`         |

---

### Rules

Rules are system-level instructions that guide how the agent behaves. Each rule is a Markdown file with a **frontmatter trigger** and a **body** containing your instructions.

#### Trigger Types

| Trigger            | Behavior                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| `always_on`        | Automatically applied to **every** agent interaction.                    |
| `manual`           | Only applied when you explicitly `@mention` the rule name in your prompt.|
| `model_decision`   | The agent decides whether to apply the rule based on its `description`.  |
| `glob`             | Automatically applied when working with files matching a pattern.        |

#### How to Create a Rule

1. **Via the UI:** Click the `...` menu in the Agent Manager panel → open **Customizations** → navigate to the **Rules** tab → click **"+ Workspace"**.
2. **Manually:** Create a `.md` file inside `.agents/rules/` with the following format:

```markdown
---
trigger: <trigger_type>
description: <optional description for model_decision triggers>
glob: <optional file pattern for glob triggers>
---

Your instructions go here in plain text or bullet points.
```

#### Examples

**Always-on rule** — Enforce a coding style across all interactions:

```markdown
---
trigger: always_on
---

* Make sure all the code is styled with PEP 8 style guide
* Make sure all the code is properly commented
```
*Save as:* `.agents/rules/code-style-guide.md`

**Always-on rule** — Guide code generation structure:

```markdown
---
trigger: always_on
---

* The main method in main.py is the entry point to showcase functionality.
* Do not generate code in the main method. Instead generate distinct functionality in a new file (eg. feature_x.py)
* Then, generate example code to show the new functionality in a new method in main.py (eg. example_feature_x) and simply call that method from the main method.
```
*Save as:* `.agents/rules/code-generation-guide.md`

**Manual rule** — Only apply when explicitly referenced with `@test-rule-1`:

```markdown
---
trigger: manual
---

Always keep the response under 3 lines
```
*Save as:* `.agents/rules/test-rule-1.md`

**Glob rule** — Automatically apply when editing TypeScript files:

```markdown
---
trigger: glob
glob: src/**/*.ts
---

* Use strict TypeScript — avoid `any` types
* Prefer interfaces over type aliases for object shapes
* All exported functions must have JSDoc comments
```
*Save as:* `.agents/rules/typescript-standards.md`

**Model-decision rule** — Let the agent decide when this rule is relevant:

```markdown
---
trigger: model_decision
description: Guidelines for writing API endpoint handlers
---

* All API handlers must validate input parameters
* Return consistent error response shapes with status codes
* Log all errors with structured logging
```
*Save as:* `.agents/rules/api-handler-guide.md`

---

### Workflows

Workflows define a **structured sequence of steps** that the agent follows to complete a repeatable task. They are triggered on-demand using a **slash command** (e.g., `/generate-unit-tests`).

#### How to Create a Workflow

1. **Via the UI:** Click the `...` menu in the Agent Manager panel → open **Customizations** → navigate to the **Workflows** tab → click **"+ Workspace"**.
2. **Via the agent:** After completing a task manually, ask the agent to *"generate a workflow from what we just did"* — it will create a reusable workflow file automatically.
3. **Manually:** Create a `.md` file inside `.agents/workflows/` with the following format:

```markdown
---
description: <short description shown in the slash command menu>
---

Step-by-step instructions for the agent to follow.
```

#### Examples

**Unit test generation workflow** — Triggered with `/generate-unit-tests`:

```markdown
---
description: Unit tests
---

* Generate unit tests for each file and each method
* Make sure the unit tests are named similar to files but with test_ prefix
```
*Save as:* `.agents/workflows/generate-unit-tests.md`

**Summarization workflow** — Triggered with `/summarize`:

```markdown
---
description: Summarize content into concise bullet points
---

Summarize the following content in 3 bullet points
```
*Save as:* `.agents/workflows/summarize.md`

**Code review workflow** — A more detailed, multi-step example triggered with `/code-review`:

```markdown
---
description: Perform a thorough code review on staged changes
---

1. Run `git diff --staged` to see all staged changes.
2. For each changed file, analyze the diff and check for:
   - Potential bugs or logic errors
   - Security vulnerabilities
   - Performance concerns
   - Missing error handling
3. Check that all new functions have proper docstrings and type hints.
4. Verify that corresponding unit tests exist and cover the new code.
5. Produce a summary report as an artifact with:
   - A list of issues found (categorized by severity)
   - Suggested fixes for each issue
   - An overall assessment (approve / request changes)
```
*Save as:* `.agents/workflows/code-review.md`

> **Tip:** You can chain workflows by having one workflow invoke another, enabling complex multi-stage automations.

---

## Tips for Getting Started

- **Start with a simple project.** Try a prompt like:
  > *"Create a simple Express.js API with two endpoints: /health and /time. Write tests, start the server, and verify both endpoints work using the browser."*
- **Use feedback loops.** Provide feedback on any artifact or agent output directly within the interface — the agent will incorporate it into its ongoing work.
- **Break down complex tasks.** For best results, assign focused, well-defined tasks rather than broad, ambiguous ones.

---

## Antigravity Tutorial

### Build Snake Game

#### Step 1: Plan 

Before starting the prompt plan on a paper

Snake Game - Game Rules:
- Snake moves in one direction at a time
- User can change direction using arrow keys (Up, Down, Left, Right)
- Food appears randomly on the board
- Snake grows when it eats food
- Game ends when snake hits wall or itself
- Keep score
- User can restart the game

Features:
- Start the game using Space bar
- Restart the game using R key

Style:
- Retro green and black CRT monitor style
- Pixelated graphics
- Simple chiptune music

#### Step 2: Write the instructions

Instructions:
- Create a new folder named "snake-game" .
- Write a simple snake game using HTML, CSS, and JavaScript only (no frameworks or libraries).
- Use single index.html file to include all HTML, CSS, and JavaScript code.
- Write the code in a clean, organized, and maintainable way.
- Create a README.md file to document the code.
- The game should follow the game rules mentioned above.
- The game should follow the features mentioned above.
- The game should follow the style mentioned above.

#### Step 3: Write the prompt

**Prompt:**

"Create a new folder named "snake-game" with a snake game using HTML, CSS, and JavaScript only (no frameworks or libraries). Use single index.html file to include all HTML, CSS, and JavaScript code. Write the code in a clean, organized, and maintainable way. Create a README.md file to document the code. The game should follow the game rules mentioned below.

Snake Game - Game Rules:
- Snake moves in one direction at a time
- User can change direction using arrow keys (Up, Down, Left, Right)
- Food appears randomly on the board
- Snake grows when it eats food
- Game ends when snake hits wall or itself
- Keep score
- User can restart the game

Features:
- Start the game using Space bar
- Restart the game using R key

Style:
- Retro green and black CRT monitor style
- Pixelated graphics
- Simple chiptune music."

#### Step 4: Generate Code

Generate the code using antigravity by giving the prompt in the prompt input box.

#### Step 5: Review the code

Review the generated code and make sure it follows the instructions.

#### Step 6: Test the code

Test the generated code and make sure it works as expected.

#### Step 7: Add new features and refine the code

Do not try to include all the features in the first prompt. Add features one by one and test the code after each feature is added.




#### Step 8: Document the code

Document the generated code and make sure it follows the instructions.




## References

1. [Google Antigravity — Official Website](https://antigravity.google)
2. [Google Antigravity — Get Started Docs](https://antigravity.google/docs/get-started)
3. [Introduction to Google Antigravity (YouTube)](https://www.youtube.com/watch?v=-iAuuFUHVr8&list=PLdKd-j64gDcDKSmLSZIdBONIvJ_s2RI9f)
4. [Google Antigravity Tutorial Playlist (YouTube)](https://www.youtube.com/watch?v=qNFTMXE4hb0&list=PLdKd-j64gDcDKSmLSZIdBONIvJ_s2RI9f&index=9)

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

## Tips for Getting Started

- **Start with a simple project.** Try a prompt like:
  > *"Create a simple Express.js API with two endpoints: /health and /time. Write tests, start the server, and verify both endpoints work using the browser."*
- **Use feedback loops.** Provide feedback on any artifact or agent output directly within the interface — the agent will incorporate it into its ongoing work.
- **Break down complex tasks.** For best results, assign focused, well-defined tasks rather than broad, ambiguous ones.

---

## References

1. [Google Antigravity — Official Website](https://antigravity.google)
2. [Google Antigravity — Get Started Docs](https://antigravity.google/docs/get-started)
3. [Introduction to Google Antigravity (YouTube)](https://www.youtube.com/watch?v=-iAuuFUHVr8&list=PLdKd-j64gDcDKSmLSZIdBONIvJ_s2RI9f)
4. [Google Antigravity Tutorial Playlist (YouTube)](https://www.youtube.com/watch?v=qNFTMXE4hb0&list=PLdKd-j64gDcDKSmLSZIdBONIvJ_s2RI9f&index=9)

# FauxSpoiler 🎯  

## Basic Details  
**Team Name:** BitBrewers  

**Team Members**  
- **Team Lead:** George Attokkaran – CCE  
- **Member 2:** Michel Treasa Saji – CCE  

---

## Project Description  
**FauxSpoiler** is an AI-powered mischief machine that creates absurd yet terrifyingly realistic fake spoilers for movies and TV shows.
---

## The Problem (that doesn't exist)  
The world suffers from a tragic lack of suspense. People binge-watch in peace, knowing the only spoilers are real ones. This tranquility is unacceptable.  

---

## The Solution (that nobody asked for)  
We weaponized AI to instantly fabricate spoilers so authentic-sounding that even the original screenwriters might start doubting their own plotlines.  

---

## Technical Details  

### Technologies/Components Used  

**For Software:**  
- **Languages:** JavaScript, TypeScript  
- **Frameworks:** Next.js  
- **APIs:** Gemini API (Google Generative AI), IMDb API (via RapidAPI)  
- **Tools:** Vercel (deployment), Git (version control)  

**For Hardware:**  
- None — except our overcaffeinated laptops and slightly concerned friends.  

---

## Implementation  

### For Software  

**Installation**  
```bash
git clone https://github.com/[username]/fauxspoiler.git
cd fauxspoiler
npm install
```

**Run**  
```bash
npm run dev
```

---

## Project Documentation  

### Screenshots  
![Screenshot1](link) *The innocent-looking homepage where chaos begins.*  

![Screenshot2](link) *A totally fabricated spoiler so believable it could end friendships.*  

![Screenshot3](link) *The “Oh no, I sent that to the wrong group” moment.*  

---

### Diagrams  
1. User Input
    User enters the movie/series name (and optionally season/episode) into the UI.

2. Fetch Plot Summary (IMDb API)
    The project sends the title to the IMDb API via RapidAPI.
    The IMDb API returns the official plot summary of the given title.

3. Generate Fake Spoiler (Gemini API)
    The original user input and the retrieved plot summary are both sent to Gemini API.
    Gemini processes the data and fabricates a believable but fake spoiler while staying aligned with the actual plot style.

4. Output to User
    The generated fake spoiler is sent back to the UI.
    User sees their “spoiler” and (optionally) shares it with friends to cause confusion. 

---

## Project Demo  

**Video:** [Demo Link](link) – Watch us turn harmless pop culture into weapons of misinformation.  

---

## Team Contributions  
- **George Attokkaran:** Team lead, frontend design, API integration, spoiler creativity  
- **Michel Treasa Saji:** UI styling, feature testing, feedback refinement  

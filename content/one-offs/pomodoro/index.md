---
title: "Pomodoro Timer"
summary: "A simple focus timer with work, short break, and long break modes."
kicker: "Starter project"
weight: 10
styles:
  - "projects/pomodoro/pomodoro.css"
scripts:
  - "projects/pomodoro/pomodoro.js"
---

<section class="pomodoro-app" aria-labelledby="pomodoro-title">
<div class="pomodoro-panel">
<div>
<p class="pomodoro-mode-label">Current mode</p>
<h2 id="pomodoro-title">Focus</h2>
</div>
<div class="pomodoro-time" aria-live="polite" aria-atomic="true">25:00</div>
<div class="pomodoro-session-counter" aria-label="Completed focus sessions"></div>
<div class="pomodoro-modes" aria-label="Timer mode">
<button type="button" class="is-active" data-mode="focus">Focus</button>
<button type="button" data-mode="short">Short break</button>
<button type="button" data-mode="long">Long break</button>
</div>
<div class="pomodoro-controls">
<button type="button" class="pomodoro-primary" data-action="toggle">Start</button>
<button type="button" data-action="reset">Reset</button>
</div>
<p class="pomodoro-status">Ready when you are.</p>
</div>
</section>

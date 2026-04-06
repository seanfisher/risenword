---
title: Submit a Poem
layout: layout.njk
description: Share your Easter poetry with Risen Word, or enter our annual Easter Poetry Contest.
---

<div class="max-w-3xl mx-auto">

  <header class="text-center mb-12">
    <h1 class="font-playfair text-5xl font-bold text-text mb-3">Submit a Poem</h1>
    <p class="text-lg text-gray-500 max-w-xl mx-auto">
      Share your Easter poetry with the Risen Word community &mdash; whether you&rsquo;re entering the annual contest or simply want your voice to be part of the collection.
    </p>
  </header>

  {# ═══════════════════════════════════════════════
     SECTION 1: Year-round general submissions
     Always visible. Update the form URL/link below.
     ═══════════════════════════════════════════════ #}
  <section class="mb-14" aria-labelledby="general-heading">
    <div class="flex items-center gap-3 mb-2">
      <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fff7f2] text-accent font-bold text-sm" aria-hidden="true">1</span>
      <h2 id="general-heading" class="font-playfair text-2xl font-bold text-text">Share Your Poem</h2>
    </div>
    <p class="text-gray-500 text-sm mb-6 ml-11">Open year-round. Submit a poem for inclusion in the Risen Word collection at any time.</p>

    <div class="w-full flex justify-center">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfeIe4AzDwIrsrmRBaoCLVnJ1x-x4mtiSpnEcJV_H-cD0pEcw/viewform?embedded=true"
        width="640"
        height="1847"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        class="w-full max-w-2xl rounded-xl"
        title="General Poem Submission Form"
        loading="lazy"
      >Loading&hellip;</iframe>
    </div>
    <p class="text-center text-sm text-gray-400 mt-3">
      Having trouble? <a href="https://docs.google.com/forms/d/e/1FAIpQLSfeIe4AzDwIrsrmRBaoCLVnJ1x-x4mtiSpnEcJV_H-cD0pEcw/viewform" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Open the form directly</a>.
    </p>
  </section>

  <hr class="border-[#e8e4dd] mb-14">

  {# ═══════════════════════════════════════════════
     SECTION 2: Annual contest submissions
     Toggle contestOpen true/false each year.
     Update contestYear, theme, formSrc, formDirectLink.
     ═══════════════════════════════════════════════ #}
  {% set contestOpen = false %}
  {% set contestYear = 2027 %}
  {% set contestTheme = "" %}
  {# Contest form URLs (update each year):
     formSrc = Google Form embed URL
     formDirectLink = direct Google Form URL
  #}
  {% set formSrc = "https://docs.google.com/forms/d/e/1FAIpQLSeTBakij2az5vgAeXf51iMDhwrAr5CXBcSnSJDtsERS6NAtkA/viewform?embedded=true" %}
  {% set formDirectLink = "https://forms.gle/rFobCgbFaVneB9zc6" %}

  <section aria-labelledby="contest-heading">
    <div class="flex items-center gap-3 mb-2">
      <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fff7f2] text-accent font-bold text-sm" aria-hidden="true">2</span>
      <h2 id="contest-heading" class="font-playfair text-2xl font-bold text-text">Enter the Easter Poetry Contest</h2>
    </div>
    <p class="text-gray-500 text-sm mb-6 ml-11">Our annual contest runs each spring. Winners are announced after Easter.</p>

    {% if contestOpen %}
      <div class="text-center mb-8">
        <p class="text-lg text-gray-600 italic mb-1">Theme: &ldquo;{{ contestTheme }}&rdquo;</p>
        <p class="text-base text-gray-500">
          Use the form below to submit your entry for the <strong>{{ contestYear }} Easter Poetry Contest</strong>.
        </p>
      </div>
      <div class="w-full flex justify-center">
        <iframe
          src="{{ formSrc }}"
          width="640"
          height="2200"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="w-full max-w-2xl"
          title="{{ contestYear }} Easter Poetry Contest Submission Form"
          loading="lazy"
        >Loading&hellip;</iframe>
      </div>
      <p class="text-center text-sm text-gray-400 mt-3">
        Having trouble? <a href="{{ formDirectLink }}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Open the form directly</a>.
      </p>
    {% else %}
      <div class="rounded-2xl border border-[#e8e4dd] bg-[#faf8f5] px-8 py-10 text-center">
        <p class="text-4xl mb-4" aria-hidden="true">&#128337;</p>
        <p class="font-playfair text-xl font-bold text-text mb-2">Contest submissions are closed</p>
        <p class="text-gray-500 text-sm mb-6">
          The {{ contestYear }} Easter Poetry Contest will open ahead of Easter {{ contestYear }}. Check back then!
        </p>
        <a href="/contests/2026/" class="inline-flex items-center justify-center bg-accent text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-accentHover transition text-sm">See the 2026 Results</a>
      </div>
    {% endif %}
  </section>

</div>

{#
SUBMISSION FORM — uncomment for next contest year and update form URL/title/description

<div class="text-center mb-8">
  <h1 class="font-playfair text-4xl font-bold tracking-wide mb-2">Submit Your Poem</h1>
  <p class="text-lg text-gray-600 italic">&ldquo;As He Said&rdquo;</p>
  <p class="mt-4 text-base max-w-xl mx-auto">
    Use the form below to submit your entry for the <strong>2026 Easter Poetry Contest</strong>.
  </p>
</div>

<div class="w-full flex justify-center">
  <iframe
    src="https://docs.google.com/forms/d/e/1FAIpQLSeTBakij2az5vgAeXf51iMDhwrAr5CXBcSnSJDtsERS6NAtkA/viewform?embedded=true"
    width="640"
    height="2200"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    class="w-full max-w-2xl"
    title="Poem Submission Form"
    loading="lazy"
  >Loading&hellip;</iframe>
</div>

<div class="text-center mt-6">
  <p class="text-sm text-gray-500">
    Having trouble with the form? <a href="https://forms.gle/rFobCgbFaVneB9zc6" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accentHover underline">Open it directly</a>.
  </p>
</div>
#}

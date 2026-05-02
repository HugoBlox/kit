---
title: 'Home'
date: 2023-10-24
type: landing

sections:
  - block: hero
    content:
      eyebrow: Beacon for product teams
      title: Turn customer [noise] into your roadmap
      text: Capture feedback from every channel — Slack, email, support, in-app — and let AI surface what matters.
      primary_action:
        text: Start free
        url: "#pricing"
        icon: rocket-launch
        style: gradient
      secondary_action:
        text: How it works
        url: "#how-it-works"
        icon: play-circle
        style: ghost
      announcement:
        badge:
          text: NEW
          color: primary
        text: AI roadmap pull is live.
        link:
          text: Read more
          url: "#features"
      trust:
        stars: 5
        text: "**4.9/5** from 1,200+ product teams"
      # To switch to a split layout with a product mockup, uncomment the media block
      # below and set `design.layout: split-left` (or `split-right` / `stacked`):
      # media:
      #   type: image
      #   src: dashboard.png
      #   dark_src: dashboard-dark.png   # optional dark-mode variant
      #   alt: Beacon dashboard
    design:
      spacing:
        padding: [0, 0, 0, 0]
        margin: [0, 0, 0, 0]
      css_class: "dark"
      section_break:
        # Fade the hero's bottom edge into the dark logos band beneath (matches its bg-gray-900)
        fade_bottom: "#101828"
      background:
        # Deep navy base; radial glow paints a soft violet spotlight from above
        color: "#0a0e27"
        gradient:
          type: radial
          start: "rgba(124,58,237,0.45)"
          end: "transparent"
          position: "50% -10%"
          shape: ellipse
          size: "80% 80%"
        # Mesh orbs add depth and atmosphere on top of the radial glow
        gradient_mesh:
          enable: true
          style: orbs
          intensity: medium
          animation: pulse
          colors: ["primary-500/25", "secondary-500/25"]
          orb_count: 2
          positions: ["top-1/3 left-1/4", "bottom-1/3 right-1/4"]
          sizes: ["w-[32rem] h-[32rem]", "w-[26rem] h-[26rem]"]
  - block: logos
    content:
      title: Trusted by product teams at
      items:
        - icon: brands/github
          name: GitHub
        - icon: brands/google
          name: Google
        - icon: brands/microsoft
          name: Microsoft
        - icon: brands/nvidia
          name: NVIDIA
        - icon: brands/openai
          name: OpenAI
        - icon: brands/anthropic
          name: Anthropic
        - icon: brands/stripe
          name: Stripe
        - icon: brands/vercel
          name: Vercel
    design:
      layout: marquee
      # White logos read cleanly against the dark band; both styles work — see logos block schema
      logo_style: white
      logo_size: md
      marquee_speed: 35
      # `dark` activates child components' `dark:` variants, `bg-gray-900` paints the band.
      # Extends the dark zone from the hero, so the hero's fade-bottom no longer reveals a light strip.
      css_class: "dark bg-gray-900"
      spacing:
        padding: ["2rem", 0, "2rem", 0]

  - block: stats
    content:
      items:
        - statistic: "12k+"
          description: |
            Signals captured  
            per day
        - statistic: "85%"
          description: |
            Less time spent  
            triaging feedback
        - statistic: "3.2×"
          description: |
            Faster roadmap  
            decisions
    design:
      layout: minimal
      numbers_gradient: true
      css_class: "bg-white dark:bg-gray-900"
      spacing:
        padding: ["3rem", 0, "3rem", 0]
  - block: steps
    id: how-it-works
    content:
      title: From scattered signals to clear priorities
      text: Get insights in your first week. No strategy doc required.
      items:
        - title: Install the widget
          text: One line of JS or our SDK. Auto-captures from your in-app surveys, Slack channels, support tickets, and email.
          icon: code-bracket
        - title: Connect your channels
          text: Slack, Linear, Notion, Zendesk, Intercom, Jira, and 30+ more — every signal flows into one inbox.
          icon: link
        - title: Ship what matters
          text: Beacon clusters signals into themes, ranks them by frequency and revenue weight, and pushes the winners to your roadmap.
          icon: rocket-launch
    design:
      layout: horizontal
      marker_style: icon
      connector: none

  - block: features
    id: features
    content:
      subtitle: Why Beacon
      title: Customer voice, organized
      text: Stop chasing feedback across five tools. Let Beacon do the listening, the synthesis, and the routing.
      items:
        - name: AI signal synthesis
          icon: sparkles
          description: Beacon clusters thousands of fragmented signals into clear themes, ranked by frequency, recency, and revenue weight. Stop sifting; start shipping.
        - name: Realtime capture
          icon: bolt
          description: From Slack threads to support tickets to in-app surveys — every channel, one inbox, instantly.
        - name: Smart segmentation
          icon: rectangle-group
          description: Slice feedback by plan tier, persona, region, or any custom property in seconds.
        - name: Roadmap sync
          icon: arrow-path
          description: Push prioritized themes straight into Linear, Jira, or Notion — round-trip status updates included.
        - name: Branded widget
          icon: paint-brush
          description: Match your product's design tokens. Custom CSS supported. Ship a widget that looks like yours.
        - name: SOC 2 + GDPR
          icon: shield-check
          description: Enterprise-grade security and data residency from day one. We never train models on customer data.
    design:
      layout: bento
      css_class: "bg-gray-50 dark:bg-gray-900/50"
  - block: comparison-table
    id: compare
    content:
      subtitle: How we compare
      title: Why teams switch to Beacon
      text: We picked the categories that matter to teams shipping today.
      competitors:
        - name: Beacon
          tagline: AI feedback platform
          highlight: true
          badge: Recommended
        - name: Canny
          tagline: Feedback boards
        - name: UserVoice
          tagline: Enterprise voice-of-customer
        - name: Productboard
          tagline: Product management suite
      rows:
        - feature: Capture
          category: true
        - feature: Channel coverage
          note: Slack, email, in-app, support
          values: ["30+", "Limited", "Limited", "Some"]
        - feature: Auto-capture from Slack
          values: [true, false, false, "limited"]
        - feature: In-app widget
          values: [true, true, true, true]
        - feature: Synthesis
          category: true
        - feature: AI clustering
          values: [true, "partial", false, "partial"]
          highlight: true
        - feature: Theme detection
          values: [true, false, false, true]
        - feature: Sentiment analysis
          values: [true, false, true, true]
        - feature: Cost & ownership
          category: true
        - feature: Free tier
          values: [true, true, false, false]
        - feature: Starting price
          values: ["Free", "$50/mo", "$499/mo", "$59/mo"]
        - feature: Roadmap integrations
          values: [true, "limited", true, true]
      cta:
        text: Start free
        url: "#pricing"
        icon: hero/arrow-right
    design:
      row_striping: true
      css_class: "bg-gray-50 dark:bg-gray-900/50"

  - block: pricing
    id: pricing
    content:
      title: "Simple, transparent pricing"
      subtitle: "Start free. Upgrade when your team grows. No credit card required."
      billing_toggle:
        enabled: true
        monthly_label: Monthly
        yearly_label: Yearly
        yearly_discount: "Save 20%"
      tiers:
        - name: Starter
          description: "Perfect for early-stage teams getting their first signals organized."
          price:
            monthly: "0"
            yearly: "0"
            currency: "$"
          price_note: "Free forever"
          highlight: false
          cta:
            text: Get started free
            url: "https://beacon.example.com/start"
            icon: hero/arrow-right
            style: outline
          features:
            - text: "Up to 5 seats"
              included: true
            - text: "500 signals / month"
              included: true
            - text: "3 channel integrations"
              included: true
            - text: AI clustering
              included: false
            - text: Priority support
              included: false
        - name: Team
          badge: Most popular
          description: "For product teams shipping seriously."
          price:
            monthly: "19"
            yearly: "15"
            currency: "$"
          price_suffix: /seat/month
          price_note_monthly: "Billed monthly"
          price_note_yearly: "Billed annually"
          highlight: true
          cta:
            text: Start free trial
            url: "https://beacon.example.com/start?plan=team"
            icon: hero/arrow-right
            style: primary
          features:
            - text: Unlimited seats
              included: true
            - text: "10,000 signals / month"
              included: true
            - text: All 30+ integrations
              included: true
            - text: AI clustering and themes
              included: true
            - text: Priority support
              included: false
        - name: Business
          description: "Scale with SSO, custom data residency, and dedicated support."
          price:
            monthly: "49"
            yearly: "39"
            currency: "$"
          price_suffix: /seat/month
          price_note_monthly: "Billed monthly"
          price_note_yearly: "Billed annually"
          highlight: false
          cta:
            text: Start free trial
            url: "https://beacon.example.com/start?plan=business"
            icon: hero/arrow-right
            style: outline
          features:
            - text: Unlimited seats
              included: true
            - text: "100,000 signals / month"
              included: true
            - text: All 30+ integrations
              included: true
            - text: AI clustering and themes
              included: true
            - text: Priority support and SSO
              included: true

  - block: cta-image-paragraph
    id: solutions
    content:
      items:
        - title: Built for makers shipping fast
          text: Beacon meets you where your customers already are. Drop in the widget, sync your tools, and watch themes emerge in your first week.
          feature_icon: check
          features:
            - "One-line install (JS snippet or SDK)"
            - "30+ integrations out of the box"
            - "AI synthesis from day one"
          # Pexels — Rodrigo Santos / photo 3888151 (free for commercial use)
          image: makers-shipping.jpg
          button:
            text: Start free
            url: "#pricing"
        - title: Loved by product and support teams
          text: Bring product, support, and engineering to the same table. Beacon turns scattered feedback into shared truth — backed by data, not opinions.
          feature_icon: bolt
          features:
            - "Slack, Zendesk, Intercom, and Linear sync"
            - "Custom roles, audit logs, and SSO"
            - "Round-trip roadmap status updates"
          # Pexels — Anna Shvets / photo 5716018 (free for commercial use)
          image: teams-collaboration.jpg
          button:
            text: Book a demo
            url: "https://beacon.example.com/demo"
    design:
      # Section background color (CSS class)
      css_class: "bg-gray-100 dark:bg-gray-900"
  - block: testimonials
    content:
      title: ""
      text: ""
      items:
        - name: "Maya Chen"
          role: "Head of Product at Loop"
          # Upload image to `assets/media/` and reference the filename here
          image: "testimonial-1.jpg"
          text: "We used to triage feedback in five different tools. Beacon clusters everything for us — and our roadmap finally reflects what users actually ask for."
    design:
      spacing:
        # Reduce bottom spacing so the testimonial appears vertically centered between sections
        padding: ["6rem", 0, 0, 0]

  - block: faq
    id: faq
    content:
      title: Frequently asked questions
      subtitle: Everything you need to know before getting started.
      items:
        - question: Where is my data hosted?
          answer: |
            We default to AWS `us-east-1`, with EU and APAC residency available on Business plans. Beacon is SOC 2 Type II certified and GDPR-compliant — and we never train models on your customer data.
        - question: Which tools does Beacon integrate with?
          answer: |
            30+ integrations across Slack, Linear, Notion, Zendesk, Intercom, Jira, HubSpot, and more. Don't see yours? The Webhooks API takes 5 minutes to wire up.
        - question: How does the AI clustering work?
          answer: |
            Beacon embeds every signal, clusters by semantic similarity, and surfaces themes ranked by frequency, recency, and revenue weight. You see clusters — not raw transcripts — within minutes of installing.
        - question: Can I migrate from Canny or UserVoice?
          answer: |
            Yes. Our import takes a CSV or API key, preserves voter and comment history, and runs in under 10 minutes for most teams. We'll do the migration for you on Business plans.
        - question: What's the free tier limit?
          answer: |
            Up to 5 seats and 500 signals per month, with all core capture and triage features. The free tier doesn't expire.
        - question: Do you have an SLA?
          answer: |
            99.9% uptime SLA on Team and Business plans. Public status page, real-time incident notifications, and post-mortems baked in.

  - block: cta-card
    content:
      title: Stop guessing. Start shipping what your customers want.
      text: Free for teams under 5 seats — no credit card, no time limit.
      button:
        text: Start free
        url: "#pricing"
    design:
      section_break:
        # Fade the cta-card section's top edge into the white FAQ section above
        fade_top: "#ffffff"
      card:
        # Brand-coloured card with subtle gradient depth
        css_class: "bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white shadow-2xl"
        css_style: ""
---

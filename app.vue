<script setup lang="ts">
type GtmKey = 'plg' | 'slg' | 'ent'
type MarketKey = 'red' | 'blue'

const stages = [
  'Awareness',
  'Interest',
  'Consideration',
  'Activation',
  'Purchase',
  'Retention',
] as const
type Stage = (typeof stages)[number]

const stageMore: Record<Stage, string> = {
  Awareness: 'They learn for the first time that you exist. Goal: get on the radar of the right people.',
  Interest: 'They lean in and want to know more. Goal: earn the click, the reply, the signup.',
  Consideration: 'They compare and they evaluate. Goal: prove you fit and take the risk out of the choice.',
  Activation: "They reach the first real value. Goal: the 'aha' moment that makes it stick.",
  Purchase: 'They commit money. Goal: remove the last friction so they pay.',
  Retention: 'They stay, they expand, they refer. Goal: recurring value and loops that compound.',
}

/* ---------- Market Type ---------- */
interface Market {
  key: MarketKey
  label: string
  color: string
  oneLiner: string
  more: string[]
  gtmHint: string
}

const markets: Market[] = [
  {
    key: 'red',
    label: 'Red Ocean',
    color: '#f87171',
    oneLiner: 'Known market, clear competitors. You fight for share in a game that exists already.',
    more: [
      'Your job is positioning, not creating demand.',
      'Pick a sharp wedge and name the competitor you beat.',
      'Make the switch obvious and low risk.',
      'The demand exists already, you only redirect it.',
    ],
    gtmHint: 'your GTM must out-execute the rivals that sit already in the room.',
  },
  {
    key: 'blue',
    label: 'Blue Ocean',
    color: '#22d3ee',
    oneLiner: 'New or redefined market. Little competition, but the demand you must create first.',
    more: [
      'Your job is education, not just selling.',
      "Define the category and show the 'before'.",
      'Make the new way feel like it was always coming.',
      'Expect a longer ramp until the demand compounds.',
    ],
    gtmHint: 'your GTM must create the demand and teach the market what to want.',
  },
]

const market = ref<MarketKey | null>(null)
const currentMarket = computed(() => markets.find((m) => m.key === market.value) ?? null)

/* ---------- GTM ---------- */
interface Gtm {
  key: GtmKey
  label: string
  tag: string
  color: string
  oneLiner: string
  motion: string
  more: string
  entry: Stage
  entryNote: string
  map: Record<Stage, string>
  arpu: string
  arpuFloor: string
  costToWin: string
  arpuWhy: string
}

const gtms: Gtm[] = [
  {
    key: 'plg',
    label: 'PLG',
    tag: 'Product-Led',
    color: 'var(--color-plg)',
    oneLiner: 'The product sells itself. Users try first, they pay later.',
    motion: 'Self-serve · low touch · high volume',
    more: 'A free plan or a trial brings users to value without a human in the loop. You win on time-to-value, on upgrade triggers inside the product, and on loops that pull the next user in.',
    entry: 'Activation',
    entryNote:
      'Bottom-up. Up top the signups are broad and cheap, but the product itself does the converting low in the funnel: activate, upgrade, loop.',
    map: {
      Awareness: 'SEO · Reddit · Content',
      Interest: 'Landing page',
      Consideration: 'Docs · Demo · Free plan',
      Activation: 'Onboarding',
      Purchase: 'In-app upgrade',
      Retention: 'Email · Product loops',
    },
    arpu: '$10 to $50 per user / month',
    arpuFloor: 'a few dollars per user is enough',
    costToWin: 'almost zero, the product does the selling',
    arpuWhy: 'No human touches the deal, so it costs you almost nothing to win one user. That is why a small price still works. But it only adds up when the volume is big, so the product and the loops have to bring the next user in for free.',
  },
  {
    key: 'slg',
    label: 'SLG',
    tag: 'Sales-Led',
    color: 'var(--color-slg)',
    oneLiner: 'A human sells. From the first touch up to a signed contract.',
    motion: 'High touch · pipeline · deal-driven',
    more: 'A rep qualifies, gives the demo, and closes. You win on pipeline discipline, on a clear ICP, and on a motion you can repeat, not on raw signup volume.',
    entry: 'Consideration',
    entryNote:
      'Mid-funnel. A rep takes a qualified lead and owns the consideration, the demo, the close. The motion starts in the middle.',
    map: {
      Awareness: 'LinkedIn · Outbound',
      Interest: 'Cold-email reply',
      Consideration: 'Demo',
      Activation: 'Trial · PoC',
      Purchase: 'Contract',
      Retention: 'Account management',
    },
    arpu: '$5k to $25k per account / year',
    arpuFloor: 'at least a few thousand per year',
    costToWin: 'a rep salary plus commission, real money',
    arpuWhy: 'A rep costs you real money every month, and one rep closes only a handful of deals. So each deal has to bring a few thousand at minimum, otherwise the rep burns more than the deal brings in. That is the hard floor under a sales-led motion, below it the math does not work.',
  },
  {
    key: 'ent',
    label: 'Enterprise',
    tag: 'Account-Led',
    color: 'var(--color-ent)',
    oneLiner: 'Complex deals, many stakeholders. Trust and process is what wins.',
    motion: 'Multi-stakeholder · long cycles · big contracts',
    more: 'Many buyers, security reviews, procurement. You win on trust, on references, and on knowing how to move through the org. You count it in quarters, not in days.',
    entry: 'Awareness',
    entryNote:
      'Top-down. You start at the very top with named accounts and execs, then you orchestrate the whole way down.',
    map: {
      Awareness: 'Events · Referrals · Analysts',
      Interest: 'Exec intro · Inbound RFP',
      Consideration: 'Security & solution review',
      Activation: 'Pilot · Proof of value',
      Purchase: 'Procurement · MSA',
      Retention: 'CSM · QBRs · Expansion',
    },
    arpu: '$50k+ per account / year',
    arpuFloor: 'high five figures and up',
    costToWin: 'months of cycle, security reviews, pilots',
    arpuWhy: 'The cycle runs over quarters with security reviews, pilots and procurement, and all of that is expensive long before the first dollar comes in. Only a big contract pays that back, so the floor sits high. A small deal could never carry the weight of the motion.',
  },
]

/* ---------- Lesson 1: the three motions in one glance (deep dive in Strategy) ---------- */
const gtmIntro = [
  {
    key: 'plg',
    label: 'PLG',
    tag: 'Product-Led',
    color: 'var(--color-plg)',
    line: 'The product sells itself.',
    econ: 'Low price · high volume · buy today',
    points: [
      'Cheap seats. The math only works with a lot of customers.',
      'Buyers know exactly what they want.',
      'The problem hurts right now, so they sign up and solve it today.',
    ],
  },
  {
    key: 'slg',
    label: 'SLG',
    tag: 'Sales-Led',
    color: 'var(--color-slg)',
    line: 'A human sells.',
    econ: 'Higher prices · weeks to months per deal',
    points: [
      'Demo calls, longer onboarding. You take the customer by the hand.',
      'The higher price is what pays for that hand-holding.',
      'No fire today. The buyer runs a decision process over weeks to months.',
    ],
  },
  {
    key: 'ent',
    label: 'Enterprise',
    tag: 'Account-Led',
    color: 'var(--color-ent)',
    line: 'You sell top-down.',
    econ: 'Very high contract value · ~a year per deal',
    points: [
      'One deal takes a year. Only a big contract carries that.',
      'You do not sell to techies. You sell to leadership.',
      'They buy to optimize processes and make the org more efficient.',
    ],
  },
]

const selected = ref<GtmKey | null>(null)
const current = computed(() => gtms.find((g) => g.key === selected.value) ?? null)
const entryIndex = computed(() =>
  current.value ? stages.indexOf(current.value.entry) : -1,
)
const isEntry = (stage: Stage) => !!current.value && stage === current.value.entry

/* ---------- Fit: market × GTM compatibility ---------- */
interface Verdict {
  level: 'good' | 'caution' | 'conflict'
  title: string
  detail: string
}

const matrix: Record<MarketKey, Record<GtmKey, Verdict>> = {
  red: {
    plg: {
      level: 'good',
      title: 'Solid fit',
      detail:
        'In a Red Ocean the demand exists already, so PLG can catch the self-serve users who are shopping a known category right now.',
    },
    slg: {
      level: 'good',
      title: 'Solid fit',
      detail:
        'Buyers know the category, so sales can show the difference and out-execute the rivals that sit already in the room.',
    },
    ent: {
      level: 'good',
      title: 'Solid fit',
      detail:
        'The budgets and the category exist already, so account-led works. You only fight for the share.',
    },
  },
  blue: {
    plg: {
      level: 'conflict',
      title: "PLG does not fit a Blue Ocean",
      detail:
        "PLG enters at the bottom, the product converts people who know already that they want it. A Blue Ocean has no demand yet, so the top of the funnel stays empty. A product can not teach a market that does not know it has the problem.",
    },
    slg: {
      level: 'good',
      title: 'Strong fit',
      detail:
        'Founder-led and sales-led selling is how new categories come to life. A human can teach one buyer at a time and build the demand from zero.',
    },
    ent: {
      level: 'caution',
      title: 'Heavy, but it works',
      detail:
        'Top-down can build a category with analysts, events and exec evangelism, but you should expect a long and expensive lift to create the demand.',
    },
  },
}

const verdict = computed<Verdict | null>(() => {
  if (!market.value || !selected.value) return null
  return matrix[market.value][selected.value]
})
const isConflict = computed(() => verdict.value?.level === 'conflict')
const isGap = (stage: Stage) =>
  isConflict.value && stages.indexOf(stage) < entryIndex.value

const verdictColor = computed(() => {
  switch (verdict.value?.level) {
    case 'conflict':
      return 'var(--color-warn)'
    case 'caution':
      return 'var(--color-caution)'
    case 'good':
      return 'var(--color-ok)'
    default:
      return 'var(--color-line)'
  }
})
const verdictSymbol = computed(() =>
  verdict.value?.level === 'conflict'
    ? '⚠'
    : verdict.value?.level === 'caution'
      ? '△'
      : '✓',
)

/* ---------- Channels ---------- */
interface Channel {
  name: string
  stage: Stage
  gtms: GtmKey[]
  more: string
}

const channels: Channel[] = [
  { name: 'SEO & Content', stage: 'Awareness', gtms: ['plg'], more: 'Compounding inbound. Slow at the start, cheap once it scales. For PLG it owns the Awareness.' },
  { name: 'Reddit & Communities', stage: 'Awareness', gtms: ['plg'], more: 'Be useful where the builders already hang out. First the trust, the links come later.' },
  { name: 'Product Loops / Virality', stage: 'Retention', gtms: ['plg'], more: 'The product invites the next user by itself: shares, invites, collaboration.' },
  { name: 'LinkedIn', stage: 'Awareness', gtms: ['slg', 'ent'], more: 'Personal and company reach for B2B. Strong for SLG and Enterprise demand gen.' },
  { name: 'Cold Outbound', stage: 'Interest', gtms: ['slg'], more: 'Targeted email or DM to your ICP. Volume times relevance is what drives the replies.' },
  { name: 'Demos & Webinars', stage: 'Consideration', gtms: ['slg', 'ent'], more: 'Show the value live. It turns interest into a serious consideration.' },
  { name: 'Events & Conferences', stage: 'Awareness', gtms: ['ent'], more: 'High cost, high trust touchpoints for the big-ticket accounts.' },
  { name: 'Partnerships / Channel', stage: 'Consideration', gtms: ['ent'], more: "Borrow the distribution and the credibility of someone else." },
  { name: 'Paid Ads', stage: 'Interest', gtms: ['plg', 'slg', 'ent'], more: 'Buy attention to fill the top fast. Works for any motion, but it costs money.' },
  { name: 'Lifecycle Email', stage: 'Retention', gtms: ['plg', 'slg', 'ent'], more: 'An owned channel to activate and to retain. The workhorse of retention.' },
]

const isActive = (c: Channel) =>
  !!selected.value && c.gtms.includes(selected.value)
const channelsFor = (stage: Stage) => channels.filter((c) => c.stage === stage)
/* Wider at the top, narrower at the bottom, so the stack reads as a funnel. */
const funnelWidth = (i: number) => `${100 - i * 8}%`

/* ---------- Guided flow (progressive disclosure inside the Strategy lesson) ---------- */
const started = ref(false)
const unlocked = computed(() => {
  if (!started.value) return 0
  if (!market.value) return 1
  if (!selected.value) return 2
  return 3
})
const lockCls = (need: number) =>
  unlocked.value < need ? 'pointer-events-none opacity-25' : ''
const activeStep = computed<'market' | 'gtm' | null>(() => {
  if (unlocked.value === 1) return 'market'
  if (unlocked.value === 2) return 'gtm'
  return null
})

/* ---------- Learn more (expand/collapse) ---------- */
const open = reactive(new Set<string>())
const toggle = (id: string) => (open.has(id) ? open.delete(id) : open.add(id))
const isOpen = (id: string) => open.has(id)

/* The step you must choose from expands all its cards so you can compare.
   Once you move on, the step you left collapses again. Still collapsible
   by hand at any time. */
watch(activeStep, (step, prev) => {
  if (prev === 'market') markets.forEach((m) => open.delete('m-' + m.key))
  if (prev === 'gtm') gtms.forEach((g) => open.delete('g-' + g.key))
  if (step === 'market') markets.forEach((m) => open.add('m-' + m.key))
  if (step === 'gtm') gtms.forEach((g) => open.add('g-' + g.key))
})

/* ---------- Lesson 5: reality check (follows from the GTM choice) ---------- */
interface Reality {
  title: string
  lead: string
  needs: string[]
  pass: string
  fail: string
}

const realityChecks: Record<GtmKey, Reality> = {
  plg: {
    title: 'Can you really pull off product-led?',
    lead: 'PLG looks easy from the outside, but it asks for a few things up front. Be honest with yourself, tick only what is really true today.',
    needs: [
      'There is a marketplace or a place where your users already hang out, so you can land in front of them.',
      'You have an audience already, or a real way to build one from zero.',
      'You can do SEO and content, and you are ok to grow slow while it compounds in the background.',
      'Your product shows its value fast, without a human there to explain it.',
      'You have patience, because PLG is a long game, the curve comes late.',
    ],
    pass: 'Good. You have the pieces product-led needs. The product can carry the selling.',
    fail: 'Honest answer, PLG would be an uphill fight for you right now. Maybe a sales-led motion fits better, where a human does the convincing.',
  },
  slg: {
    title: 'Can you really pull off sales-led?',
    lead: 'Sales-led comes down to one thing in the end, you are the salesperson. Tick only what you would really do.',
    needs: [
      'You can find the right people on LinkedIn and start a cold conversation.',
      'You are ok to push a stranger into a call, and you do not feel too weird about it.',
      'You will follow up again and again, most deals need many touches before a yes.',
      'You can run a demo and take the no, the doubt, the price talk.',
      'Plain question, are you a seller? Because sales-led lives or dies on that.',
    ],
    pass: 'Good. You have the stomach for sales-led. Now go build the pipeline.',
    fail: 'If most of this feels wrong, sales-led will hurt every day. Maybe product-led fits you better, where the product does the talking.',
  },
  ent: {
    title: 'Can you really pull off enterprise?',
    lead: 'Enterprise is the heaviest motion of them all. Tick only what you honestly have today, not what you hope for.',
    needs: [
      'You have the connections to even get into the big accounts in the first place.',
      'You have the money for a professional grade product, not just an MVP.',
      'You can pay for security, compliance and the lawyer costs that come with it.',
      'You can survive a 12 to 14 month sales cycle before the first customer pays.',
      'You have the cash to wait that long with no revenue coming in.',
    ],
    pass: 'Good. You can carry the weight enterprise needs. Play the long game.',
    fail: 'Be honest, enterprise without these turns into a money pit. Start lighter, earn the right to move up-market later.',
  },
}

const reality = computed(() => (current.value ? realityChecks[current.value.key] : null))

const answers = reactive<Record<string, 'yes' | 'no'>>({})
const setAnswer = (id: string, val: 'yes' | 'no') => {
  answers[id] = val
}
const answerOf = (id: string) => answers[id]

const checkResult = computed(() => {
  const r = reality.value
  if (!current.value || !r) {
    return { total: 0, answered: 0, allAnswered: false, noItems: [] as string[], noCount: 0 }
  }
  const key = current.value.key
  const answered = r.needs.filter((_, i) => !!answers[key + '-' + i]).length
  const noItems = r.needs.filter((_, i) => answers[key + '-' + i] === 'no')
  return {
    total: r.needs.length,
    answered,
    allAnswered: answered === r.needs.length,
    noItems,
    noCount: noItems.length,
  }
})
const checkVerdict = computed<'pass' | 'caution' | 'fail' | null>(() => {
  const r = checkResult.value
  if (!r.allAnswered || r.total === 0) return null
  if (r.noCount === 0) return 'pass'
  if (r.noCount > Math.floor(r.total / 2)) return 'fail'
  return 'caution'
})
const checkColor = computed(() =>
  checkVerdict.value === 'pass'
    ? 'var(--color-ok)'
    : checkVerdict.value === 'fail'
      ? 'var(--color-warn)'
      : 'var(--color-caution)',
)

/* ---------- Lesson 2: does your idea solve a real problem? ---------- */
interface Probe {
  key: string
  q: string
  hint: string
  placeholder: string
}
const probeQuestions: Probe[] = [
  {
    key: 'situation',
    q: 'When does it show up?',
    hint: 'The trigger moment. A job always starts in a concrete situation, not in a demographic.',
    placeholder: 'Two weeks after invoices go out and half the members still have not paid.',
  },
  {
    key: 'job',
    q: 'What are they trying to get done?',
    hint: 'The job itself, in plain words. This is the thing they would hire any tool for.',
    placeholder: 'Collect the open payments without chasing 30 people one by one.',
  },
  {
    key: 'outcome',
    q: 'So they can what?',
    hint: 'The real outcome behind the job, the reason they even care.',
    placeholder: 'Get my volunteer role done in 2 hours a month instead of 10.',
  },
  {
    key: 'hire',
    q: 'What do they hire today instead?',
    hint: 'Their current fix, even if it is a spreadsheet or just doing nothing. That is your real competition.',
    placeholder: 'An Excel list plus one-by-one WhatsApp messages.',
  },
]
const probe = reactive<Record<string, string>>({})
const probeFilled = computed(
  () => probeQuestions.filter((p) => (probe[p.key] || '').trim()).length,
)
const talkedToReal = ref<'yes' | 'no' | null>(null)

/* ---------- Lesson 2: worked examples next to the probe fields ---------- */
interface JobExample {
  key: string
  label: string
  tag: string
  values: Record<string, string>
  note?: string
}
const jobExamples: JobExample[] = [
  {
    key: 'milkshake',
    label: 'Milkshake',
    tag: 'The classic',
    values: {
      situation: 'Every morning, alone in the car, half an hour of boring commute ahead.',
      job: 'Keep me company on the drive, one hand on the wheel.',
      outcome: 'Make the ride fly by and hold me over until lunch.',
      hire: 'Bananas, donuts, coffee. Gone in two minutes or a mess in the car.',
    },
    note: 'The shake was never hired against hunger. McDonald’s made it extra thick so it lasts the whole 30-minute drive. Same product, completely different job.',
  },
  {
    key: 'invoices',
    label: 'PDF Generator',
    tag: 'Solo SaaS',
    values: {
      situation: 'End of the month, bookkeeping night, every invoice still built by hand.',
      job: 'Turn my billing data into finished PDF invoices automatically.',
      outcome: 'Close the books in one evening instead of one weekend.',
      hire: 'A Word template, copy-paste, save as PDF.',
    },
  },
  {
    key: 'crm',
    label: 'CRM',
    tag: 'B2B SaaS',
    values: {
      situation: 'Five sales reps, five Excel lists, nobody knows which customer row is current.',
      job: 'Bundle all customers and deals into one system the whole team shares.',
      outcome: 'See the pipeline in one view instead of merging spreadsheets.',
      hire: 'One Excel list per rep. It works, until two reps call the same customer.',
    },
  },
]
const exampleKey = ref('milkshake')
const jobExample = computed(
  () => jobExamples.find((e) => e.key === exampleKey.value) ?? jobExamples[0],
)

/* ---------- Pain intensity of the job (maps to a motion) ---------- */
type PainKey = 'blocking' | 'nagging' | 'optimizing'
interface PainLevel {
  key: PainKey
  label: string
  line: string
  detail: string
  gtm: GtmKey
  color: string
}
const painLevels: PainLevel[] = [
  {
    key: 'blocking',
    label: 'Blocking',
    line: '"I need this fixed now, it is in my way today."',
    detail:
      'Hair-on-fire pain. People already search for a fix and try whatever they find. They will sign up and pay on their own, no call needed. That pull is what a product-led motion runs on.',
    gtm: 'plg',
    color: 'var(--color-plg)',
  },
  {
    key: 'nagging',
    label: 'Nagging',
    line: '"It costs me real time and money, but I live with it."',
    detail:
      'Real pain, but no fire. People will not go looking on their own, yet they lean in when someone shows them a better way. A human has to start the conversation, so this is sales-led ground.',
    gtm: 'slg',
    color: 'var(--color-slg)',
  },
  {
    key: 'optimizing',
    label: 'Optimizing',
    line: '"It works today, but we could do it better or cheaper."',
    detail:
      'No bleeding, just a process worth improving. The case is built on ROI, many stakeholders and trust, and it plays out over quarters. That is the enterprise game.',
    gtm: 'ent',
    color: 'var(--color-ent)',
  },
]
const painLevel = ref<PainKey | null>(null)
const painPick = computed(
  () => painLevels.find((p) => p.key === painLevel.value) ?? null,
)
const painImplied = computed(() =>
  painPick.value ? gtms.find((g) => g.key === painPick.value!.gtm) ?? null : null,
)

interface Validation {
  intro: string
  tests: { name: string; body: string }[]
}
const validations: Record<GtmKey, Validation> = {
  plg: {
    intro: 'PLG lives on demand that is already out there and on self-serve. So test if the pull even exists, long before you build the thing.',
    tests: [
      {
        name: 'Start a Reddit thread',
        body: 'Post the problem in the subreddit where your users hang out. If people pile in with "yes, this kills me too", the pain is real. If it stays quiet, that is your answer too.',
      },
      {
        name: 'Buy a little search demand',
        body: 'Run a tiny Google Ads test on the keywords, or just open Google Trends. Is anyone even searching for this? No search, no self-serve demand to catch.',
      },
    ],
  },
  slg: {
    intro: 'SLG lives on you talking to people. So go talk to people first, before you build a single screen.',
    tests: [
      {
        name: 'Pull people into calls',
        body: 'Find ten of your ICP on LinkedIn and drag them into a call. Pitch the pain, not the product. Do they lean in and ask when they can buy, or do they go polite and vague?',
      },
      {
        name: 'Ask for a pre-commit',
        body: 'The hard test: would they put down a deposit or sign a letter of intent today? Real interest survives that question, polite interest does not.',
      },
    ],
  },
  ent: {
    intro: 'Enterprise lives on access and trust. So test if you can even get in the room, before you build.',
    tests: [
      {
        name: 'Ask your contacts for an intro',
        body: 'Go to the people you know and ask for a warm intro to the real user or buyer inside a target enterprise. If nobody will even make the intro, the demand is not there yet.',
      },
      {
        name: 'Land one real conversation',
        body: 'Get one call with that buyer and let them describe the pain in their own words. If they cannot, or it is just not a priority for them, no contract is coming.',
      },
    ],
  },
}
const currentValidation = computed(() => (current.value ? validations[current.value.key] : null))

/* General ways to get a signal without building the product. */
const startMethods = [
  {
    name: 'Smoke test',
    body: 'A landing page that promises the thing, with a sign-up or a "buy" button. Count who clicks. No product behind it yet, just the promise.',
  },
  {
    name: 'Prototype',
    body: 'A clickable mockup or a short Loom of the flow. Enough to make people feel it and react, and not a single line of real code.',
  },
  {
    name: 'Concierge',
    body: 'Do the job by hand for the first users, no software at all. If they pay you to do it manually, the product is worth building.',
  },
]

/* Subtle further reading. */
const books = [
  {
    title: 'Start Small, Stay Small',
    author: 'Rob Walling',
    note: 'The classic for bootstrapped, niche-first launches. Distribution over funding.',
    url: 'https://www.amazon.de/Start-Small-Stay-Developers-Launching-ebook/dp/B003YH9MMI',
  },
  {
    title: 'The Right It',
    author: 'Alberto Savoia',
    note: 'Pretotyping from the person who coined it. Fake the product and test the demand before you build. Lesson 6 in book form.',
    url: 'https://www.amazon.de/Right-Many-Ideas-Yours-Succeed/dp/0062884662/',
  },
  {
    title: 'The SaaS Playbook',
    author: 'Rob Walling',
    note: 'The operator manual for a bootstrapped SaaS, from the first users up to scale.',
    url: 'https://www.amazon.de/SaaS-Playbook-Multimillion-Dollar-Startup-Without-ebook/dp/B0CCQB26RS',
  },
  {
    title: 'Jobs to Be Done: Theory to Practice',
    author: 'Anthony W. Ulwick',
    note: 'The deep dive behind lesson 2, why people hire a product and how to find the job.',
    url: 'https://www.amazon.de/Jobs-Done-Theory-Practice-English-ebook/dp/B0CH1DWMQZ',
  },
]

/* ---------- Wizard: one lesson per screen (0 = intro stage) ---------- */
const lesson = ref(0)
const lessonSteps = [
  { n: 1, label: 'Motions' },
  { n: 2, label: 'The job' },
  { n: 3, label: 'Pain' },
  { n: 4, label: 'Strategy' },
  { n: 5, label: 'Reality' },
  { n: 6, label: 'Start' },
]
/* Motions, job, pain and the motion pick are always open. Reality and Start
   need a motion chosen in Lesson 4 first. */
const lessonUnlocked = (n: number) => (n <= 4 ? true : !!selected.value)
/* Each lesson gets its own URL (hash route) so the browser back/forward
   buttons walk through them and a lesson can be deep-linked. */
const lessonSlugs: Record<number, string> = {
  0: '',
  1: 'motions',
  2: 'the-job',
  3: 'pain',
  4: 'strategy',
  5: 'reality',
  6: 'start',
}
const slugToLesson: Record<string, number> = {
  '': 0,
  motions: 1,
  'the-job': 2,
  pain: 3,
  strategy: 4,
  reality: 5,
  start: 6,
}
const hashFor = (n: number) => (lessonSlugs[n] ? `#${lessonSlugs[n]}` : '')

const goLesson = (n: number) => {
  if (!lessonUnlocked(n)) return
  lesson.value = n
  if (typeof window !== 'undefined') {
    const target = hashFor(n)
    if (window.location.hash !== target) {
      window.history.pushState(
        { lesson: n },
        '',
        target || window.location.pathname + window.location.search,
      )
    }
  }
}

/* Adopt the lesson encoded in the URL (deep link or a back/forward step).
   A locked lesson falls back to the intro. */
const applyFromHash = () => {
  if (typeof window === 'undefined') return
  const slug = window.location.hash.replace(/^#/, '')
  let n = slugToLesson[slug] ?? 0
  if (!lessonUnlocked(n)) n = 0
  if (n >= 1) started.value = true
  lesson.value = n
}

const backToMotion = () => {
  goLesson(4)
  nextTick(() => {
    if (typeof document !== 'undefined') {
      document.getElementById('gtm')?.scrollIntoView({ block: 'start' })
    }
  })
}
const progressPct = computed(() => `${(lesson.value / lessonSteps.length) * 100}%`)
watch(lesson, () => {
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
})

/* ---------- Persist inputs + current step in localStorage ---------- */
const STORAGE_KEY = 'sbm-progress'
/* Guards against the watcher writing the pristine initial state over a saved
   one before the restore in onMounted has run. */
let progressReady = false

const restoreProgress = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const s = JSON.parse(raw)
    started.value = !!s.started
    market.value = s.market ?? null
    selected.value = s.selected ?? null
    talkedToReal.value = s.talkedToReal ?? null
    painLevel.value = s.painLevel ?? null
    Object.assign(probe, s.probe ?? {})
    Object.assign(answers, s.answers ?? {})
    if (typeof s.lesson === 'number' && lessonUnlocked(s.lesson)) {
      lesson.value = s.lesson
    }
  } catch {
    /* corrupt state: start fresh */
  }
}

const saveProgress = () => {
  if (typeof window === 'undefined' || !progressReady) return
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        lesson: lesson.value,
        started: started.value,
        market: market.value,
        selected: selected.value,
        talkedToReal: talkedToReal.value,
        painLevel: painLevel.value,
        probe: { ...probe },
        answers: { ...answers },
      }),
    )
  } catch {
    /* storage full or blocked: course still works, just without resume */
  }
}

watch(
  () => [
    lesson.value,
    started.value,
    market.value,
    selected.value,
    talkedToReal.value,
    painLevel.value,
    { ...probe },
    { ...answers },
  ],
  saveProgress,
  { deep: true },
)

const clearProgress = () => {
  if (typeof window !== 'undefined') {
    if (!window.confirm('Reset the course? All your answers will be gone.')) return
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }
  started.value = false
  market.value = null
  selected.value = null
  talkedToReal.value = null
  painLevel.value = null
  Object.keys(probe).forEach((k) => delete probe[k])
  Object.keys(answers).forEach((k) => delete answers[k])
  goLesson(0)
}

onMounted(() => {
  restoreProgress()
  /* A hash in the URL (deep link, back/forward) wins over the saved step. */
  if (window.location.hash) applyFromHash()
  progressReady = true
  // Normalize the current history entry to the resolved lesson so Back returns
  // to a clean state, then follow the URL on every back/forward step.
  window.history.replaceState(
    { lesson: lesson.value },
    '',
    hashFor(lesson.value) || window.location.pathname + window.location.search,
  )
  window.addEventListener('popstate', applyFromHash)
})
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('popstate', applyFromHash)
  }
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-ink text-fg">
    <!-- ===== Header + progress bar ===== -->
    <header class="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3.5">
        <button type="button" class="flex items-center gap-2.5" @click="goLesson(0)">
          <span
            class="grid h-7 w-7 place-items-center rounded-md bg-brand font-mono text-[10px] font-bold text-ink"
            >SBM</span
          >
          <span class="hidden font-mono text-sm font-semibold tracking-tight sm:inline"
            >SaaS Builders Manual</span
          >
        </button>

        <span
          v-if="lesson === 0"
          class="font-mono text-xs text-fg-faint"
          >Marketing crash course</span
        >
        <div v-else class="flex items-center gap-1.5 sm:gap-3">
          <template v-for="(step, i) in lessonSteps" :key="step.n">
            <button
              type="button"
              class="flex items-center gap-2 transition disabled:cursor-not-allowed"
              :disabled="!lessonUnlocked(step.n)"
              @click="goLesson(step.n)"
            >
              <span
                class="grid h-7 w-7 place-items-center rounded-full border font-mono text-xs font-semibold transition"
                :style="lesson === step.n
                  ? { borderColor: 'var(--color-brand)', backgroundColor: 'var(--color-brand)', color: 'var(--color-ink)' }
                  : lessonUnlocked(step.n)
                    ? { borderColor: 'var(--color-line)', color: 'var(--color-fg-muted)' }
                    : { borderColor: 'var(--color-line)', color: 'var(--color-fg-faint)' }"
                >{{ step.n }}</span
              >
              <span
                class="hidden font-mono text-xs sm:inline"
                :style="{ color: lesson === step.n ? 'var(--color-fg)' : 'var(--color-fg-faint)' }"
                >{{ step.label }}</span
              >
            </button>
            <span
              v-if="i < lessonSteps.length - 1"
              class="h-px w-4 bg-line sm:w-8"
            ></span>
          </template>
          <button
            type="button"
            class="ml-2 font-mono text-[11px] text-fg-faint transition hover:text-fg sm:ml-4"
            title="Reset the course and clear all answers"
            @click="clearProgress"
          >
            ↺ Reset
          </button>
        </div>
      </div>
      <div v-if="lesson >= 1" class="h-0.5 w-full bg-line/50">
        <div
          class="h-full bg-brand transition-all duration-500"
          :style="{ width: progressPct }"
        ></div>
      </div>
    </header>

    <main class="flex-1">
      <!-- ====================== INTRO · Stage ====================== -->
      <section v-if="lesson === 0" class="relative overflow-hidden">
        <div class="grid-bg absolute inset-0 opacity-40"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink"></div>
        <div class="relative mx-auto max-w-[1440px] px-6 pb-28 pt-20 md:pb-32 md:pt-28">
          <h1 class="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Distribution <span class="text-brand">&gt;</span> Product
          </h1>
          <div class="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-fg-muted">
            <p>
              The default playbook: build for months, then go find &ldquo;someone for
              marketing.&rdquo; Three LinkedIn posts later, it&rsquo;s over.
            </p>
            <p>
              <span class="font-semibold text-fg">Your channel is a day-one decision, not an afterthought.</span>
              Bake distribution into every product iteration.
            </p>
          </div>

          <div class="mt-9">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-mono text-sm font-semibold text-ink transition hover:bg-brand-soft"
              @click="started = true; goLesson(1)"
            >
              Start the course <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ====================== LESSON 1 · Go-to-market motions ====================== -->
      <div v-else-if="lesson === 1" class="mx-auto max-w-[1440px] px-6 pb-24 pt-10">
        <div class="flex items-center gap-4">
          <span
            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand bg-surface font-mono text-sm font-semibold text-brand"
            >L1</span
          >
          <div>
            <p class="eyebrow">Lesson 1</p>
            <h2 class="text-xl font-bold tracking-tight">Go-to-market</h2>
          </div>
        </div>

        <p class="mt-5 max-w-2xl text-lg font-semibold">
          Three ways software gets bought.
        </p>
        <p class="mt-2 max-w-2xl text-fg-muted">
          Every product grows on exactly one of these motions. The one you pick
          sets your price, your channels, and what you build first. That is why
          it comes before the code.
        </p>

        <div class="mt-6 grid gap-3 md:grid-cols-3">
          <div
            v-for="g in gtmIntro"
            :key="g.key"
            class="rounded-xl border border-line bg-surface p-5"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: g.color }"></span>
                <h3 class="font-semibold">{{ g.label }}</h3>
              </div>
              <span
                class="rounded-md px-2 py-0.5 font-mono text-[11px]"
                :style="{ backgroundColor: `color-mix(in srgb, ${g.color} 18%, transparent)`, color: g.color }"
                >{{ g.tag }}</span
              >
            </div>
            <p class="mt-2 text-sm font-medium">{{ g.line }}</p>
            <p class="mt-1.5 font-mono text-xs text-fg-faint">{{ g.econ }}</p>
            <ul class="mt-3 space-y-1.5 border-t border-line/60 pt-3 text-sm leading-relaxed text-fg-muted">
              <li v-for="point in g.points" :key="point" class="flex gap-2">
                <span class="select-none" :style="{ color: g.color }">▸</span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Lesson 1 nav -->
        <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-8">
          <p class="text-sm text-fg-muted">
            You will pick your motion in lesson 4.
            <span class="font-semibold text-fg">But first: your product. What job does it actually do?</span>
          </p>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-mono text-sm font-semibold text-ink transition hover:bg-brand-soft"
            @click="goLesson(2)"
          >
            Lesson 2 · The job <span>→</span>
          </button>
        </div>
      </div>

      <!-- ====================== LESSON 4 · Strategy ====================== -->
      <div v-else-if="lesson === 4" class="mx-auto max-w-[1440px] px-6 pb-16 pt-10">
        <!-- Vertical flow -->
        <div>
          <!-- STEP 01 · Market -->
          <div id="market" class="flex gap-5 scroll-mt-24 transition" :class="lockCls(1)">
            <div class="flex flex-col items-center">
              <div
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-surface font-mono text-sm font-semibold transition"
                :class="activeStep === 'market' ? 'ring-2 ring-brand/40' : ''"
                :style="
                  currentMarket
                    ? { borderColor: currentMarket.color, color: currentMarket.color }
                    : { borderColor: 'var(--color-line)', color: 'var(--color-brand)' }
                "
              >
                01
              </div>
              <div class="mt-2 w-px flex-1 bg-line/50"></div>
            </div>
            <div class="flex-1 pb-14">
              <p class="eyebrow mb-4">Market Type</p>
              <div class="grid gap-3 sm:grid-cols-2">
                <div
                  v-for="m in markets"
                  :key="m.key"
                  class="cursor-pointer rounded-xl border bg-surface p-5 transition hover:bg-surface-2"
                  :class="market === m.key ? '' : market ? 'opacity-50 hover:opacity-90' : ''"
                  :style="market === m.key ? { borderColor: m.color, boxShadow: `0 0 0 1px ${m.color}` } : { borderColor: 'var(--color-line)' }"
                  @click="market = m.key"
                >
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: m.color }"></span>
                    <h3 class="font-semibold">{{ m.label }}</h3>
                  </div>
                  <p class="mt-2 text-sm text-fg-muted">{{ m.oneLiner }}</p>
                  <button
                    type="button"
                    class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-soft transition hover:text-brand"
                    @click.stop="toggle('m-' + m.key)"
                  >
                    {{ isOpen('m-' + m.key) ? 'Less' : 'Learn more' }}
                    <span>{{ isOpen('m-' + m.key) ? '↑' : '→' }}</span>
                  </button>
                  <ul
                    v-if="isOpen('m-' + m.key)"
                    class="mt-3 space-y-1.5 border-t border-line/60 pt-3 text-sm leading-relaxed text-fg-muted"
                  >
                    <li v-for="point in m.more" :key="point" class="flex gap-2">
                      <span class="select-none" :style="{ color: m.color }">▸</span>
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 02 · GTM -->
          <div id="gtm" class="flex gap-5 scroll-mt-24 transition" :class="lockCls(2)">
            <div class="flex flex-col items-center">
              <div
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-surface font-mono text-sm font-semibold transition"
                :class="activeStep === 'gtm' ? 'ring-2 ring-brand/40' : ''"
                :style="
                  current
                    ? { borderColor: current.color, color: current.color }
                    : { borderColor: 'var(--color-line)', color: 'var(--color-brand)' }
                "
              >
                02
              </div>
              <div class="mt-2 w-px flex-1 bg-line/50"></div>
            </div>
            <div class="flex-1 pb-14">
              <p class="eyebrow mb-4">Go-To-Market</p>
              <div
                class="grid gap-3 transition md:grid-cols-3"
                :class="market ? '' : 'pointer-events-none opacity-40'"
              >
                <div
                  v-for="g in gtms"
                  :key="g.key"
                  class="cursor-pointer rounded-xl border bg-surface p-5 transition hover:bg-surface-2"
                  :class="selected === g.key ? '' : selected ? 'opacity-50 hover:opacity-90' : ''"
                  :style="selected === g.key ? { borderColor: g.color, boxShadow: `0 0 0 1px ${g.color}` } : { borderColor: 'var(--color-line)' }"
                  @click="selected = g.key"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: g.color }"></span>
                      <h3 class="font-semibold">{{ g.label }}</h3>
                    </div>
                    <span
                      class="rounded-md px-2 py-0.5 font-mono text-[11px]"
                      :style="{ backgroundColor: `color-mix(in srgb, ${g.color} 18%, transparent)`, color: g.color }"
                      >{{ g.tag }}</span
                    >
                  </div>
                  <p class="mt-2 text-sm text-fg-muted">{{ g.oneLiner }}</p>
                  <p class="mt-2 font-mono text-xs text-fg-faint">{{ g.motion }}</p>
                  <button
                    type="button"
                    class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-soft transition hover:text-brand"
                    @click.stop="toggle('g-' + g.key)"
                  >
                    {{ isOpen('g-' + g.key) ? 'Less' : 'Learn more' }}
                    <span>{{ isOpen('g-' + g.key) ? '↑' : '→' }}</span>
                  </button>
                  <p
                    v-if="isOpen('g-' + g.key)"
                    class="mt-3 border-t border-line/60 pt-3 text-sm leading-relaxed text-fg-muted"
                  >
                    {{ g.more }}
                  </p>
                </div>
              </div>

              <!-- Fit verdict -->
              <div
                v-if="verdict"
                class="mt-4 flex gap-3 rounded-xl border p-4 transition"
                :style="{
                  borderColor: verdictColor,
                  backgroundColor: `color-mix(in srgb, ${verdictColor} 8%, var(--color-surface))`,
                }"
              >
                <span
                  class="grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-sm font-bold"
                  :style="{
                    backgroundColor: `color-mix(in srgb, ${verdictColor} 18%, transparent)`,
                    color: verdictColor,
                  }"
                  >{{ verdictSymbol }}</span
                >
                <div>
                  <h4 class="font-semibold" :style="{ color: verdictColor }">
                    {{ verdict.title }}
                  </h4>
                  <p class="mt-1 text-sm leading-relaxed text-fg-muted">
                    {{ verdict.detail }}
                  </p>
                  <a
                    v-if="isConflict"
                    href="#funnel"
                    class="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition"
                    :style="{ color: verdictColor }"
                  >
                    See exactly where it breaks, down in the funnel
                    <span>↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 03 · Funnel × Channels -->
          <div id="funnel" class="flex gap-5 scroll-mt-24 transition" :class="lockCls(3)">
            <div class="flex flex-col items-center">
              <div
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-surface font-mono text-sm font-semibold transition"
                :style="
                  isConflict
                    ? { borderColor: 'var(--color-warn)', color: 'var(--color-warn)' }
                    : current
                      ? { borderColor: current.color, color: current.color }
                      : { borderColor: 'var(--color-line)', color: 'var(--color-brand)' }
                "
              >
                03
              </div>
              <div class="mt-2 w-px flex-1 bg-line/50"></div>
            </div>
            <div class="flex-1 pb-14">
              <p class="eyebrow mb-4">Funnel &times; Channels</p>
              <!-- Placeholder: needs a GTM -->
              <div
                v-if="!current"
                class="rounded-xl border border-dashed border-line bg-surface/40 p-6"
              >
                <p class="text-fg-faint">
                  The funnel is where the strategy turns into execution. Pick a
                  <span class="text-fg-muted">GTM motion</span> above and watch
                  where it enters the funnel, and which channels fill each stage.
                </p>
              </div>

              <template v-else>
                <!-- column captions -->
                <div class="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                  <p class="font-mono text-[11px] text-fg-faint">↓ the funnel</p>
                  <p class="hidden font-mono text-[11px] text-fg-faint sm:block">
                    channels that fill the stage
                  </p>
                </div>

                <div class="space-y-2">
                  <div
                    v-for="(stage, i) in stages"
                    :key="stage"
                    class="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
                  >
                    <!-- LEFT: funnel stage, tapering -->
                    <div class="flex justify-center">
                      <!-- Demand-gap stage (conflict, above entry) -->
                      <div
                        v-if="isGap(stage)"
                        class="flex w-full flex-col justify-center rounded-xl border border-dashed bg-transparent p-3"
                        :style="{ width: funnelWidth(i), borderColor: `color-mix(in srgb, var(--color-warn) 55%, transparent)` }"
                      >
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-[11px] text-fg-faint">0{{ i + 1 }}</span>
                          <h3 class="text-sm font-semibold text-fg-faint line-through decoration-warn/60">
                            {{ stage }}
                          </h3>
                          <span
                            class="ml-auto rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
                            :style="{ backgroundColor: `color-mix(in srgb, var(--color-warn) 14%, transparent)`, color: 'var(--color-warn)' }"
                            >demand gap</span
                          >
                        </div>
                      </div>

                      <!-- Normal / entry stage -->
                      <div
                        v-else
                        class="flex w-full flex-col justify-center rounded-xl border bg-surface p-3 transition"
                        :style="{
                          width: funnelWidth(i),
                          borderColor: isEntry(stage) ? current.color : `color-mix(in srgb, ${current.color} 28%, var(--color-line))`,
                          boxShadow: isEntry(stage) ? `0 0 0 1px ${current.color}` : 'none',
                        }"
                      >
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-[11px] text-fg-faint">0{{ i + 1 }}</span>
                          <h3 class="text-sm font-semibold">{{ stage }}</h3>
                          <span
                            v-if="isEntry(stage)"
                            class="ml-auto rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
                            :style="{
                              backgroundColor: `color-mix(in srgb, ${isConflict ? 'var(--color-warn)' : current.color} 18%, transparent)`,
                              color: isConflict ? 'var(--color-warn)' : current.color,
                            }"
                            >&#9656; enters here</span
                          >
                        </div>
                        <button
                          type="button"
                          class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-soft transition hover:text-brand"
                          @click="toggle('f-' + stage)"
                        >
                          {{ isOpen('f-' + stage) ? 'Less' : 'Learn more' }}
                          <span>{{ isOpen('f-' + stage) ? '↑' : '→' }}</span>
                        </button>
                        <div
                          v-if="isOpen('f-' + stage)"
                          class="mt-2 space-y-2 border-t border-line/60 pt-2 text-sm leading-relaxed text-fg-muted"
                        >
                          <p>{{ stageMore[stage] }}</p>
                          <p v-if="isEntry(stage)" :style="{ color: current.color }">
                            {{ current.entryNote }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- RIGHT: channels that fill this stage -->
                    <div class="flex flex-col gap-2">
                      <template v-if="channelsFor(stage).length">
                        <div
                          v-for="c in channelsFor(stage)"
                          :key="c.name"
                          class="rounded-lg border p-2.5 transition"
                          :class="isActive(c) ? 'bg-surface-2' : 'bg-surface opacity-45'"
                          :style="isActive(c) && current ? { borderColor: current.color } : { borderColor: 'var(--color-line)' }"
                        >
                          <div class="flex items-center justify-between gap-2">
                            <span class="text-sm font-medium">{{ c.name }}</span>
                            <span
                              v-if="isActive(c) && current"
                              class="h-2 w-2 shrink-0 rounded-full"
                              :style="{ backgroundColor: current.color }"
                            ></span>
                            <span
                              v-else
                              class="shrink-0 font-mono text-[10px] uppercase tracking-wider text-fg-faint"
                              >off motion</span
                            >
                          </div>
                          <button
                            type="button"
                            class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-soft transition hover:text-brand"
                            @click="toggle('c-' + c.name)"
                          >
                            {{ isOpen('c-' + c.name) ? 'Less' : 'Learn more' }}
                            <span>{{ isOpen('c-' + c.name) ? '↑' : '→' }}</span>
                          </button>
                          <p
                            v-if="isOpen('c-' + c.name)"
                            class="mt-2 border-t border-line/60 pt-2 text-sm leading-relaxed text-fg-muted"
                          >
                            {{ c.more }}
                          </p>
                        </div>
                      </template>
                      <div
                        v-else
                        class="flex items-center rounded-lg border border-dashed border-line/60 px-3 py-2 text-xs text-fg-faint"
                      >
                        No channel here. The product itself does this work.
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Conflict payoff -->
                <div
                  v-if="isConflict"
                  class="mt-5 rounded-xl border p-5"
                  :style="{
                    borderColor: 'var(--color-warn)',
                    backgroundColor: `color-mix(in srgb, var(--color-warn) 8%, var(--color-surface))`,
                  }"
                >
                  <h4 class="flex items-center gap-2 font-semibold" :style="{ color: 'var(--color-warn)' }">
                    <span>&#9888;</span> Now it is obvious
                  </h4>
                  <p class="mt-2 text-sm leading-relaxed text-fg-muted">
                    {{ current.label }} plugs in low, at
                    <span :style="{ color: current.color }">{{ current.entry }}</span>,
                    and it relies on people who <em>already know they want this</em>
                    and who flow down from the top. But a
                    <span :style="{ color: currentMarket?.color }">{{ currentMarket?.label }}</span>
                    has no demand at the top yet, so those stages stay dashed,
                    because they are empty. The product can not educate a market
                    that does not know it has the problem.
                  </p>
                  <p class="mt-3 text-sm leading-relaxed text-fg-muted">
                    The fix: create the demand first with a motion that enters
                    higher.
                    <button
                      type="button"
                      class="font-semibold underline decoration-dotted underline-offset-2"
                      :style="{ color: 'var(--color-slg)' }"
                      @click="selected = 'slg'"
                    >
                      Sales-Led
                    </button>
                    teaches one buyer at a time, or
                    <button
                      type="button"
                      class="font-semibold underline decoration-dotted underline-offset-2"
                      :style="{ color: 'var(--color-ent)' }"
                      @click="selected = 'ent'"
                    >
                      Enterprise
                    </button>
                    builds the category top-down. PLG can come later, when the
                    ocean is not empty any more.
                  </p>
                </div>
              </template>
            </div>
          </div>

          <!-- STEP 04 · Pricing -->
          <div id="pricing" class="flex gap-5 scroll-mt-24 transition" :class="lockCls(3)">
            <div class="flex flex-col items-center">
              <div
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-surface font-mono text-sm font-semibold transition"
                :style="
                  current
                    ? { borderColor: current.color, color: current.color }
                    : { borderColor: 'var(--color-line)', color: 'var(--color-brand)' }
                "
              >
                04
              </div>
            </div>
            <div class="flex-1">
              <p class="eyebrow mb-4">Pricing</p>

              <!-- Placeholder: needs a GTM -->
              <div
                v-if="!current"
                class="rounded-xl border border-dashed border-line bg-surface/40 p-6"
              >
                <p class="text-fg-faint">
                  Your price is not a guess, it falls out of the motion. Pick a
                  <span class="text-fg-muted">GTM motion</span> above and you see
                  the ARPU it lives at, and why it can not go lower.
                </p>
              </div>

              <template v-else>
                <!-- The motion's ARPU band -->
                <div
                  class="rounded-xl border p-5"
                  :style="{
                    borderColor: `color-mix(in srgb, ${current.color} 45%, var(--color-line))`,
                    backgroundColor: `color-mix(in srgb, ${current.color} 7%, var(--color-surface))`,
                  }"
                >
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <span class="text-sm text-fg-muted">
                      <span class="font-semibold" :style="{ color: current.color }">{{ current.label }}</span>
                      lives around
                    </span>
                    <span class="font-mono text-lg font-semibold" :style="{ color: current.color }">
                      {{ current.arpu }}
                    </span>
                  </div>
                  <p class="mt-3 text-sm leading-relaxed text-fg-muted">
                    {{ current.arpuWhy }}
                  </p>
                </div>

                <!-- The connection: floor rises with the cost to win -->
                <p class="eyebrow mb-3 mt-6">Why the floor moves</p>
                <div class="grid gap-3 sm:grid-cols-3">
                  <div
                    v-for="g in gtms"
                    :key="g.key"
                    class="rounded-xl border p-4 transition"
                    :class="selected === g.key ? 'bg-surface-2' : 'bg-surface opacity-45'"
                    :style="selected === g.key ? { borderColor: g.color, boxShadow: `0 0 0 1px ${g.color}` } : { borderColor: 'var(--color-line)' }"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <h3 class="font-semibold">{{ g.label }}</h3>
                      <span class="font-mono text-[11px]" :style="{ color: g.color }">{{ g.arpu }}</span>
                    </div>
                    <div class="mt-3 border-t border-line/60 pt-3">
                      <p class="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                        floor
                      </p>
                      <p class="mt-1 text-sm text-fg-muted">{{ g.arpuFloor }}</p>
                      <p class="mt-2 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                        cost to win one
                      </p>
                      <p class="mt-1 text-sm text-fg-muted">{{ g.costToWin }}</p>
                    </div>
                  </div>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-fg-muted">
                  See the line? The further up-market you go, the more it costs you
                  to win one customer, so the price floor climbs right with it.
                  ARPU is not a number you pick out of the air, it is your motion
                  priced out.
                </p>
              </template>
            </div>
          </div>

          <!-- Lesson 4 nav -->
          <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-8">
            <button
              type="button"
              class="inline-flex items-center gap-2 font-mono text-sm font-semibold text-fg-muted transition hover:text-fg"
              @click="goLesson(3)"
            >
              <span>←</span> Lesson 3
            </button>
            <div class="flex flex-wrap items-center gap-3">
              <p v-if="!selected" class="text-sm text-fg-faint">
                Pick a market and a motion above to continue.
              </p>
              <button
                type="button"
                :disabled="!selected"
                class="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold transition disabled:cursor-not-allowed"
                :class="selected ? 'bg-brand text-ink hover:bg-brand-soft' : 'bg-surface-2 text-fg-faint'"
                @click="goLesson(5)"
              >
                Lesson 5 · Reality check <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ====================== LESSON 5 · Reality check ====================== -->
      <div v-else-if="lesson === 5" class="mx-auto max-w-[1440px] px-6 pb-24 pt-10">
        <div class="flex items-center gap-4">
          <span
            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-surface font-mono text-sm font-semibold"
            :style="
              current
                ? { borderColor: current.color, color: current.color }
                : { borderColor: 'var(--color-line)', color: 'var(--color-brand)' }
            "
            >L5</span
          >
          <div>
            <p class="eyebrow">Lesson 5</p>
            <h2 class="text-xl font-bold tracking-tight">A reality check</h2>
          </div>
        </div>

        <!-- Placeholder: needs the Strategy lesson done -->
        <div
          v-if="!reality || !current"
          class="mt-5 rounded-xl border border-dashed border-line bg-surface/40 p-6"
        >
          <p class="text-fg-faint">
            Finish lesson 4 first. Pick a
            <span class="text-fg-muted">GTM motion</span> there, then we test if
            you can really run it.
          </p>
        </div>

        <template v-else>
          <p class="mt-5 max-w-2xl text-fg-muted">
            Lesson 4 handed you a motion. But a motion is only worth something if
            you can actually run it. Going
            <span :style="{ color: current.color }">{{ current.label }}</span>
            asks a few hard things from you, so let us be honest now and not six
            months too late.
          </p>

          <div
            class="mt-5 rounded-xl border p-5"
            :style="{
              borderColor: `color-mix(in srgb, ${current.color} 40%, var(--color-line))`,
              backgroundColor: `color-mix(in srgb, ${current.color} 6%, var(--color-surface))`,
            }"
          >
            <h3 class="text-lg font-semibold">{{ reality.title }}</h3>
            <p class="mt-1 text-sm text-fg-muted">{{ reality.lead }}</p>

            <div class="mt-4 space-y-2">
              <div
                v-for="(need, idx) in reality.needs"
                :key="idx"
                class="rounded-lg border p-3 transition"
                :style="answerOf(current.key + '-' + idx) === 'yes'
                  ? { borderColor: 'var(--color-ok)' }
                  : answerOf(current.key + '-' + idx) === 'no'
                    ? { borderColor: 'var(--color-caution)' }
                    : { borderColor: 'var(--color-line)' }"
              >
                <p class="text-sm leading-relaxed">{{ need }}</p>
                <div class="mt-3 flex gap-2.5">
                  <button
                    type="button"
                    class="inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition active:scale-[0.98]"
                    :style="answerOf(current.key + '-' + idx) === 'yes'
                      ? { backgroundColor: 'var(--color-ok)', color: 'var(--color-ink)', boxShadow: '0 1px 0 0 color-mix(in srgb, var(--color-ok) 40%, black)' }
                      : { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-fg-muted)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }"
                    @click="setAnswer(current.key + '-' + idx, 'yes')"
                  >
                    <span class="text-xs">&#10003;</span> Yes
                  </button>
                  <button
                    type="button"
                    class="inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition active:scale-[0.98]"
                    :style="answerOf(current.key + '-' + idx) === 'no'
                      ? { backgroundColor: 'var(--color-caution)', color: 'var(--color-ink)', boxShadow: '0 1px 0 0 color-mix(in srgb, var(--color-caution) 40%, black)' }
                      : { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-fg-muted)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }"
                    @click="setAnswer(current.key + '-' + idx, 'no')"
                  >
                    <span class="text-xs">&#10005;</span> No
                  </button>
                </div>
              </div>
            </div>

            <!-- Progress until everything is answered -->
            <p
              v-if="!checkResult.allAnswered"
              class="mt-4 font-mono text-xs text-fg-faint"
            >
              {{ checkResult.answered }} / {{ checkResult.total }} answered.
              Be honest on each one to see where you stand.
            </p>

            <!-- Graded verdict -->
            <div
              v-else
              class="mt-4 rounded-lg border p-4 transition"
              :style="{
                borderColor: checkColor,
                backgroundColor: `color-mix(in srgb, ${checkColor} 8%, var(--color-surface))`,
              }"
            >
              <!-- pass -->
              <template v-if="checkVerdict === 'pass'">
                <p class="text-sm font-semibold" :style="{ color: checkColor }">
                  All green. {{ reality.pass }}
                </p>
              </template>

              <!-- caution: a couple of gaps -->
              <template v-else-if="checkVerdict === 'caution'">
                <p class="text-sm font-semibold" :style="{ color: checkColor }">
                  Close, but you have {{ checkResult.noCount }} gap{{ checkResult.noCount > 1 ? 's' : '' }}.
                </p>
                <ul class="mt-2 space-y-1.5 text-sm text-fg-muted">
                  <li
                    v-for="item in checkResult.noItems"
                    :key="item"
                    class="flex gap-2"
                  >
                    <span class="select-none" :style="{ color: checkColor }">&#9656;</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
                <p class="mt-3 text-sm leading-relaxed text-fg-muted">
                  Close these first, or they quietly decide the motion for you.
                </p>
              </template>

              <!-- fail: this motion fights you -->
              <template v-else>
                <p class="text-sm font-semibold" :style="{ color: checkColor }">
                  {{ reality.fail }}
                </p>
                <p class="mt-2 text-sm leading-relaxed text-fg-muted">
                  You said no to too much here, and that is not a failure, it is a
                  signal. Go back and pick a motion that fits how you really work.
                  Sometimes it even means rethinking what you build, and that is
                  exactly lesson 2.
                </p>
                <button
                  type="button"
                  class="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition"
                  :style="{ color: checkColor }"
                  @click="backToMotion"
                >
                  <span>&#8593;</span> Back to the motion choice
                </button>
              </template>
            </div>
          </div>
        </template>

        <!-- Lesson 5 nav -->
        <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-8">
          <button
            type="button"
            class="inline-flex items-center gap-2 font-mono text-sm font-semibold text-fg-muted transition hover:text-fg"
            @click="goLesson(4)"
          >
            <span>←</span> Lesson 4
          </button>
          <button
            type="button"
            :disabled="!selected"
            class="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold transition disabled:cursor-not-allowed"
            :class="selected ? 'bg-brand text-ink hover:bg-brand-soft' : 'bg-surface-2 text-fg-faint'"
            @click="goLesson(6)"
          >
            Lesson 6 · How to start <span>→</span>
          </button>
        </div>
      </div>

      <!-- ============ LESSON 2 · The job  +  LESSON 3 · How bad is the pain ============
           Split out of the old product lesson. At runtime these render as
           lessons 2 and 3 (before Strategy); they live here in source next to
           the shared probe/pain state they came from. -->
      <!-- ====================== LESSON 2 · The job ====================== -->
      <div v-else-if="lesson === 2" class="mx-auto max-w-[1440px] px-6 pb-24 pt-10">
        <div class="flex items-center gap-4">
          <span
            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand bg-surface font-mono text-sm font-semibold text-brand"
            >L2</span
          >
          <div>
            <p class="eyebrow">Lesson 2</p>
            <h2 class="text-xl font-bold tracking-tight">The job</h2>
          </div>
        </div>

        <p class="mt-5 max-w-2xl text-lg font-semibold">
          Define the job your product gets done.
        </p>
        <p class="mt-2 max-w-2xl text-fg-muted">
          Nobody wants your product. They hire it to get a job done. Fill the
          four fields below as one honest sentence. If a line feels fuzzy, that
          is exactly where your idea is still weak.
        </p>

        <!-- Guided self-interview + worked examples -->
        <div class="mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-6">
          <div class="space-y-3">
            <div
              v-for="(p, i) in probeQuestions"
              :key="p.key"
              class="rounded-xl border border-line bg-surface p-4 sm:p-5"
            >
              <label class="block">
                <span class="flex items-baseline gap-2">
                  <span class="font-mono text-xs text-fg-faint">0{{ i + 1 }}</span>
                  <span class="font-semibold">{{ p.q }}</span>
                </span>
                <p class="mt-1.5 text-xs leading-relaxed text-fg-faint">{{ p.hint }}</p>
                <input
                  v-model="probe[p.key]"
                  type="text"
                  :placeholder="p.placeholder"
                  class="mt-2.5 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-fg outline-none transition placeholder:text-fg-faint focus:border-brand"
                />
              </label>
            </div>
          </div>

          <!-- Worked examples -->
          <aside class="rounded-xl border border-line bg-surface p-4 sm:p-5 lg:sticky lg:top-24">
            <p class="eyebrow">See it filled in</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="e in jobExamples"
                :key="e.key"
                type="button"
                class="rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition active:scale-[0.98]"
                :style="exampleKey === e.key
                  ? { backgroundColor: 'var(--color-brand)', color: 'var(--color-ink)' }
                  : { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-fg-muted)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }"
                @click="exampleKey = e.key"
              >
                {{ e.label }}
              </button>
            </div>
            <p class="mt-2 font-mono text-[11px] text-fg-faint">{{ jobExample.tag }}</p>
            <div class="mt-4 space-y-3.5">
              <div v-for="(p, i) in probeQuestions" :key="p.key">
                <p class="font-mono text-[11px] text-fg-faint">0{{ i + 1 }} · {{ p.q }}</p>
                <p class="mt-0.5 text-sm italic leading-relaxed text-fg-muted">
                  &ldquo;{{ jobExample.values[p.key] }}&rdquo;
                </p>
              </div>
            </div>
            <p
              v-if="jobExample.note"
              class="mt-4 border-t border-line/60 pt-3 text-xs leading-relaxed text-fg-faint"
            >
              {{ jobExample.note }}
            </p>
          </aside>
        </div>

        <!-- Honesty nudge -->
        <div class="mt-3 rounded-xl border border-line bg-surface p-4 sm:p-5">
          <p class="font-semibold">Have you watched a real person have this problem?</p>
          <p class="mt-1 text-xs text-fg-faint">
            Not a friend being nice. A real target user, in the wild. Talking to
            zero people is the number one way founders fool themselves.
          </p>
          <div class="mt-3 flex gap-2.5">
            <button
              type="button"
              class="inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition active:scale-[0.98]"
              :style="talkedToReal === 'yes'
                ? { backgroundColor: 'var(--color-ok)', color: 'var(--color-ink)' }
                : { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-fg-muted)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }"
              @click="talkedToReal = 'yes'"
            >
              <span class="text-xs">&#10003;</span> Yes
            </button>
            <button
              type="button"
              class="inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition active:scale-[0.98]"
              :style="talkedToReal === 'no'
                ? { backgroundColor: 'var(--color-caution)', color: 'var(--color-ink)' }
                : { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-fg-muted)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }"
              @click="talkedToReal = 'no'"
            >
              <span class="text-xs">&#10005;</span> No
            </button>
          </div>
          <p
            v-if="talkedToReal === 'no'"
            class="mt-3 text-sm leading-relaxed"
            :style="{ color: 'var(--color-caution)' }"
          >
            Then stop here and go do that first. Everything below is a guess until
            one real person nods.
          </p>
        </div>

        <!-- Assembled job statement -->
        <JobLine
          class="mt-8"
          :situation="probe.situation"
          :job="probe.job"
          :outcome="probe.outcome"
          :hire="probe.hire"
          :filled="probeFilled"
          :total="probeQuestions.length"
          :accent="current?.color"
        />

        <!-- Lesson 2 nav -->
        <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-8">
          <p class="text-sm text-fg-muted">
            Got the job in one line? Now see how hard it bites.
          </p>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-mono text-sm font-semibold text-ink transition hover:bg-brand-soft"
            @click="goLesson(3)"
          >
            Lesson 3 · How bad is the pain <span>→</span>
          </button>
        </div>
      </div>

      <!-- ====================== LESSON 3 · How bad is the pain ====================== -->
      <div v-else-if="lesson === 3" class="mx-auto max-w-[1440px] px-6 pb-24 pt-10">
        <div class="flex items-center gap-4">
          <span
            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand bg-surface font-mono text-sm font-semibold text-brand"
            >L3</span
          >
          <div>
            <p class="eyebrow">Lesson 3</p>
            <h2 class="text-xl font-bold tracking-tight">How bad is the pain?</h2>
          </div>
        </div>

        <!-- Recap of the job line from Lesson 2 -->
        <JobLine
          class="mt-6"
          :situation="probe.situation"
          :job="probe.job"
          :outcome="probe.outcome"
          :hire="probe.hire"
          :filled="probeFilled"
          :total="probeQuestions.length"
          :accent="current?.color"
        />

        <!-- Pain intensity of the job -->
        <p class="mb-3 mt-5 max-w-2xl text-sm text-fg-muted">
          The same job can be a fire or a nice-to-have. How hard it bites decides
          how people buy, and it points straight at the motion you should run.
          Pick the line that sounds like your user.
        </p>
        <div class="grid gap-3 sm:grid-cols-3">
          <button
            v-for="p in painLevels"
            :key="p.key"
            type="button"
            class="rounded-xl border p-4 text-left transition active:scale-[0.99]"
            :style="painLevel === p.key
              ? { borderColor: p.color, backgroundColor: `color-mix(in srgb, ${p.color} 10%, var(--color-surface))` }
              : { borderColor: 'var(--color-line)', backgroundColor: 'var(--color-surface)' }"
            @click="painLevel = p.key"
          >
            <span class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: p.color }"></span>
              <span class="font-semibold">{{ p.label }}</span>
            </span>
            <span class="mt-2 block text-sm italic leading-relaxed text-fg-muted">{{ p.line }}</span>
          </button>
        </div>
        <div class="mt-2 flex items-center justify-between font-mono text-[11px] text-fg-faint">
          <span>← blocking · solve it now</span>
          <span>process optimization →</span>
        </div>

        <!-- Pain → implied motion -->
        <div
          v-if="painPick"
          class="mt-4 rounded-xl border p-5"
          :style="{
            borderColor: `color-mix(in srgb, ${painPick.color} 40%, var(--color-line))`,
            backgroundColor: `color-mix(in srgb, ${painPick.color} 6%, var(--color-surface))`,
          }"
        >
          <p class="text-sm leading-relaxed text-fg-muted">{{ painPick.detail }}</p>
          <p class="mt-3 text-sm">
            This <span class="font-semibold">{{ painPick.label.toLowerCase() }}</span> job usually wants a
            <span class="font-semibold" :style="{ color: painPick.color }">{{ painImplied?.tag }}</span>
            ({{ painImplied?.label }}) motion. Keep that in mind when you pick your
            motion in Lesson 4.
          </p>
        </div>

        <!-- Lesson 3 nav -->
        <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-8">
          <button
            type="button"
            class="inline-flex items-center gap-2 font-mono text-sm font-semibold text-fg-muted transition hover:text-fg"
            @click="goLesson(2)"
          >
            <span>←</span> Lesson 2
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-mono text-sm font-semibold text-ink transition hover:bg-brand-soft"
            @click="goLesson(4)"
          >
            Lesson 4 · Strategy <span>→</span>
          </button>
        </div>
      </div>

      <!-- ====================== LESSON 6 · How to start ====================== -->
      <div v-else class="mx-auto max-w-[1440px] px-6 pb-24 pt-10">
        <div class="flex items-center gap-4">
          <span
            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand bg-surface font-mono text-sm font-semibold text-brand"
            >L6</span
          >
          <div>
            <p class="eyebrow">Lesson 6</p>
            <h2 class="text-xl font-bold tracking-tight">How to start</h2>
          </div>
        </div>

        <p class="mt-5 max-w-2xl text-fg-muted">
          You do not need to develop anything to find out if it works. You need a
          signal and a bit of momentum. Build the cheapest thing that gets you a
          real reaction, and only write code once the reaction is there.
        </p>

        <!-- Cheap ways to get a signal -->
        <p class="eyebrow mb-3 mt-8">Get a signal without building</p>
        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="m in startMethods"
            :key="m.name"
            class="rounded-xl border border-line bg-surface p-4"
          >
            <h3 class="font-semibold">{{ m.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ m.body }}</p>
          </div>
        </div>

        <!-- Motion-specific moves -->
        <p class="eyebrow mb-3 mt-10">In your motion</p>
        <div
          v-if="currentValidation && current"
          class="rounded-xl border p-5"
          :style="{
            borderColor: `color-mix(in srgb, ${current.color} 40%, var(--color-line))`,
            backgroundColor: `color-mix(in srgb, ${current.color} 6%, var(--color-surface))`,
          }"
        >
          <p class="text-sm leading-relaxed text-fg-muted">
            Your motion is
            <span class="font-semibold" :style="{ color: current.color }">{{ current.label }}</span>.
            {{ currentValidation.intro }}
          </p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div
              v-for="(test, i) in currentValidation.tests"
              :key="test.name"
              class="rounded-lg border border-line bg-surface p-4"
            >
              <div class="flex items-center gap-2">
                <span
                  class="grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold"
                  :style="{ backgroundColor: `color-mix(in srgb, ${current.color} 18%, transparent)`, color: current.color }"
                  >{{ i + 1 }}</span
                >
                <h3 class="text-sm font-semibold">{{ test.name }}</h3>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ test.body }}</p>
            </div>
          </div>
        </div>

        <p class="mt-6 max-w-2xl text-sm leading-relaxed text-fg-muted">
          Signal there? Now build. Signal not there? You just saved yourself
          months. That is the whole point of this course, test fast and kill fast,
          no drama.
        </p>

        <!-- Going deeper -->
        <div class="mt-10 border-t border-line/60 pt-6">
          <p class="eyebrow mb-3">Going deeper</p>
          <ul class="space-y-3">
            <li v-for="b in books" :key="b.url">
              <a
                :href="b.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex flex-wrap items-baseline gap-x-2 text-sm transition hover:text-fg"
              >
                <span class="font-medium text-fg-muted">{{ b.title }}</span>
                <span class="text-fg-faint">· {{ b.author }}</span>
                <span class="text-brand-soft">&#8599;</span>
              </a>
              <p class="mt-0.5 text-xs text-fg-faint">{{ b.note }}</p>
            </li>
          </ul>
        </div>

        <!-- Lesson 6 nav -->
        <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-8">
          <button
            type="button"
            class="inline-flex items-center gap-2 font-mono text-sm font-semibold text-fg-muted transition hover:text-fg"
            @click="goLesson(5)"
          >
            <span>←</span> Lesson 5
          </button>
          <span class="font-mono text-xs text-fg-faint">That is the course. Now go build.</span>
        </div>
      </div>
    </main>

    <footer class="border-t border-line/60">
      <div
        class="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-fg-faint sm:flex-row"
      >
        <span class="font-mono">SaaS Builders Manual</span>
        <span>Marketing crash course for software builders</span>
      </div>
    </footer>
  </div>
</template>

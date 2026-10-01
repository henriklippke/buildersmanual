/* SEO articles. Every claim here is taken from the course itself (motions,
   funnel entry points, channels, ARPU floors, pain levels, reality checks,
   validation tests), so the articles and the course never disagree.
   The body copy is written on purpose in a loose, personal, slightly
   German-English voice with the odd typo. Titles, h1 and descriptions stay
   clean because Google shows them. */

export interface ArticleSection {
  h2: string
  paras?: string[]
  bullets?: string[]
}

export interface Article {
  slug: string
  /* <title> and og:title */
  title: string
  h1: string
  description: string
  kicker: string
  /* accent: a motion color token, or brand */
  accent: string
  minutes: number
  intro: string[]
  sections: ArticleSection[]
  takeaways: string[]
  /* course lesson to send the reader into */
  cta: { label: string; href: string }
  /* one or two lines above the coaching button */
  coaching: string
  /* book notes link out to the book */
  book?: { title: string; author: string; url: string }
}

export const articles: Article[] = [
  {
    slug: 'product-led-growth',
    title: 'What Is Product-Led Growth (PLG)? A Guide for SaaS Builders',
    h1: 'Product-led growth: when the product sells itself',
    description:
      'What product-led growth (PLG) really means, where it enters the funnel, which channels it runs on, what price it needs and how to test if PLG works for your SaaS before you build.',
    kicker: 'Go-to-market · PLG',
    accent: 'var(--color-plg)',
    minutes: 6,
    intro: [
      'Product-led growth, short PLG, means the product sells itself. People try it first and pay later. There is a free plan or a trial, and no human is in the loop. The product does the converting.',
      'Honestly, this is the motion almost every developer wants. No sales calls, no demos, just signups that turn into money. And exactly because of that it gets picked for the wrong reasons very often. So let me show you how it realy works and when you should better leave the finger from it.',
    ],
    sections: [
      {
        h2: 'How product-led growth works',
        paras: [
          'PLG is self-serve, low touch, high volume. You win with how fast someone gets to value, with upgrade triggers inside the product and with loops that bring the next user in.',
          'Nobody walks the buyer through a decision here. The buyer knows exactly what he wants, the problem hurts right now, so he signs up and solves it today. If your product can show its value fast and without somebody explaining it, then PLG can carry the selling. If not, it gets hard.',
        ],
      },
      {
        h2: 'Where PLG enters the funnel',
        paras: [
          'Every motion enters the funnel at a different point. PLG is bottom-up, it starts at Activation. At the top you get lots of broad and cheap signups, but the real work happens low in the funnel: activate, upgrade, loop.',
          'Roughly it looks like this:',
        ],
        bullets: [
          'People find you through SEO, Reddit and content (Awareness)',
          'A landing page gets them interested',
          'Docs, a demo video and the free plan do the Consideration',
          'Onboarding brings the "aha" moment, this is where PLG lives or dies',
          'They pay with an in-app upgrade',
          'Email and product loops keep them and bring new ones',
        ],
      },
      {
        h2: 'The channels behind PLG',
        paras: [
          'You win every user for almost nothing, so you need channels that are cheap and that compound over time.',
        ],
        bullets: [
          'SEO and content. Slow at the begining, cheap once it scales. For PLG this is the main Awareness channel.',
          'Reddit and communities. Be useful where your users allready hang out. Trust first, links come later.',
          'Product loops and virality, so shares, invites, collaboration. The product invites the next user by itself.',
          'Lifecycle email to activate and keep people.',
          'Paid ads work too, but it costs money and it stops the second you stop paying.',
        ],
      },
      {
        h2: 'PLG pricing: low ARPU, a lot of volume',
        paras: [
          'Your price is not something you just guess. It comes out of the motion. PLG normally sits at $10 to $50 per user per month, and a few dollars per user is already enough.',
          'Why? Because no human touches the deal. Winning one user costs you almost nothing, so a small price works. But only when the volume is big. That means the product and the loops have to bring in the next user for free. Cheap seats only make sense with a lot of customers, there is no way around it.',
        ],
      },
      {
        h2: 'When PLG does not work',
        paras: [
          'PLG needs demand that is already there. It depends on people who already know they want something like this.',
          'In a Blue Ocean, so a new or redefined market, there is simply no demand at the top. The funnel stays empty. And a product can not teach a market that does not even know it has the problem. Here you first have to create the demand with sales-led or top-down, PLG can come later when the ocean is not empty anymore.',
          'In a Red Ocean, known market with clear competitors, PLG fits well. It catches the self-serve users who are shopping in that category right now anyway.',
        ],
      },
      {
        h2: 'Can you actually pull off PLG?',
        paras: ['From the outside PLG looks easy. It is not. Be honest with yourself here:'],
        bullets: [
          'Is there a marketplace or a place where your users already are, so you can land in front of them?',
          'Do you have an audience, or a real plan how to build one from zero?',
          'Can you do SEO and content, and are you ok to grow slow while it compounds?',
          'Does your product show its value fast, without a human explaining it?',
          'Do you have patience? PLG is a long game, the curve comes late.',
        ],
      },
      {
        h2: 'Test it before you build',
        paras: [
          'PLG lives on existing demand. So find out if the pull is even there, long before you write the code.',
        ],
        bullets: [
          'Post the problem in the subreddit where your users hang out. When people pile in with "yes, this kills me too", the pain is real. When it stays quiet, thats also an answer.',
          'Buy a little bit of search demand. A tiny Google Ads test on the keywords, or just open Google Trends. Nobody searches for it? Then there is no self-serve demand you can catch.',
        ],
      },
    ],
    takeaways: [
      'PLG means the product sells itself, users try first and pay later.',
      'It enters the funnel at Activation and lives on SEO, communities and product loops.',
      'Low price ($10 to $50 per user / month) only works with high volume.',
      'It needs existing demand. In a Blue Ocean, PLG does not fit.',
    ],
    cta: { label: 'Find your motion in the course', href: '/#motions' },
    coaching:
      'Not sure if your product can really sell itself? In a 1:1 we look at your onboarding, your pricing and your channels together and find out if PLG is the right bet.',
  },

  {
    slug: 'sales-led-growth',
    title: 'What Is Sales-Led Growth (SLG)? A Guide for SaaS Founders',
    h1: 'Sales-led growth: when a human sells',
    description:
      'What sales-led growth (SLG) means for SaaS: where it enters the funnel, the channels it runs on, why it needs a few thousand per account and how to validate SLG with ten calls.',
    kicker: 'Go-to-market · SLG',
    accent: 'var(--color-slg)',
    minutes: 6,
    intro: [
      'Sales-led growth, or SLG, is when a human sells. From the very first touch until the contract is signed. Someone qualifies the lead, does the demo and closes the deal.',
      'High touch, pipeline, deal by deal. You dont win with lots of signups. You win with a clean pipeline, a clear ICP and a process you can repeat again and again.',
    ],
    sections: [
      {
        h2: 'How sales-led growth works',
        paras: [
          'In SLG you have demo calls and a longer onboarding. You take the customer by the hand, and the higher price is what pays for exactly this hand-holding.',
          'There is no fire today. The buyer has a real pain, but he can live with it. So he runs a decision process over weeks or months. A human has to start that conversation and has to carry it until the close. Without you, nothing happens.',
        ],
      },
      {
        h2: 'Where SLG enters the funnel',
        paras: [
          'SLG starts in the middle of the funnel, at Consideration. A rep takes a qualified lead and owns everything from there: consideration, demo, close.',
        ],
        bullets: [
          'Awareness comes from LinkedIn and outbound',
          'Interest is basically a reply on your cold email',
          'Consideration is the demo',
          'Activation is a trial or a proof of concept',
          'Purchase is a contract, not a credit card form',
          'Retention is account management',
        ],
      },
      {
        h2: 'The channels behind SLG',
        bullets: [
          'LinkedIn, personal and company reach. For B2B this is very strong.',
          'Cold outbound, so targeted emails or DMs to your ICP. Volume times relevance, that is what brings the replies.',
          'Demos and webinars. Showing the value live turns interest into a serious consideration.',
          'Lifecycle email to keep the customers.',
          'And paid ads if you want to fill the top fast and have the budget for it.',
        ],
      },
      {
        h2: 'SLG pricing: there is a hard floor',
        paras: [
          'Sales-led usually lives at $5k to $25k per account per year. At least a few thousand per year, below that it does not work.',
          'A rep costs real money every month, salary plus commission. And one rep closes only a handful of deals. So every deal has to bring a few thousand minimum, otherwise the rep burns more than the deal brings in. Thats the hard floor under sales-led. Under it the math is simply broken, no matter how good your product is.',
        ],
      },
      {
        h2: 'Where SLG is strong: new categories',
        paras: [
          'In a Blue Ocean, a new or redefined market, SLG fits really good. Founder-led and sales-led selling is how new categories come to life. A human can teach one buyer after the other and build the demand from zero.',
          'In a Red Ocean the buyers know the category already. Sales can show the difference and out-execute the competitors that are already sitting in the room.',
        ],
      },
      {
        h2: 'Can you actually pull off SLG?',
        paras: ['At the end it comes down to one thing: you are the salesperson. So be honest:'],
        bullets: [
          'Can you find the right people on LinkedIn and start a cold conversation?',
          'Are you ok to push a stranger into a call, without feeling super weird about it?',
          'Will you follow up again and again? Most deals need many touches before the yes.',
          'Can you run a demo and handle the no, the doubts, the price discussion?',
          'Plain question, are you a seller? Sales-led lives or dies with that.',
        ],
      },
      {
        h2: 'Test it before you build',
        paras: ['SLG lives on you talking to people. So go talk to people first, before you build even one screen.'],
        bullets: [
          'Find ten people from your ICP on LinkedIn and get them into a call. Pitch the pain, not the product. Do they lean in and ask when they can buy? Or do they get polite and vague?',
          'Then the hard test: would they pay a deposit or sign a letter of intent today? Real interest survives this question. Polite interest dosent.',
        ],
      },
    ],
    takeaways: [
      'SLG means a human sells, from the first touch to a signed contract.',
      'It enters the funnel at Consideration and lives on LinkedIn, outbound and demos.',
      'It needs at least a few thousand per account per year to pay for the rep.',
      'It is the strongest motion to build a brand-new category.',
    ],
    cta: { label: 'Run the reality check in the course', href: '/#strategy' },
    coaching:
      'Never sold before? Most founders havent. In the coaching we work on your ICP, your outreach and your first demo calls, so you are not alone with it.',
  },

  {
    slug: 'enterprise-sales',
    title: 'Enterprise SaaS Sales: How the Account-Led Motion Works',
    h1: 'Enterprise: selling top-down to big accounts',
    description:
      'How enterprise SaaS sales works: top-down selling to leadership, many stakeholders, 12 to 14 month cycles, $50k+ contracts, and the honest checklist before you go enterprise.',
    kicker: 'Go-to-market · Enterprise',
    accent: 'var(--color-ent)',
    minutes: 6,
    intro: [
      'Enterprise is the account-led motion. Complex deals, a lot of stakeholders, long cycles and big contracts. What wins here is trust and process.',
      'Its the heaviest of the three motions, by far. One deal can easily take a year, so only a big contract can carry that. Lets look at how it works and what it really costs you.',
    ],
    sections: [
      {
        h2: 'How enterprise sales works',
        paras: [
          'You have many buyers, security reviews, procurement. You win with trust, with references and with knowing how to move through the organisation. And you count in quarters, not in days.',
          'Important: you dont sell to the techies. You sell to leadership. Enterprises buy to optimize processes and to make the org more efficient. It works today already, but it could be better or cheaper. So your case is built on ROI, on many stakeholders and on trust.',
        ],
      },
      {
        h2: 'Where enterprise enters the funnel',
        paras: [
          'Enterprise is top-down. You start at the very top, with named accounts and execs, and then you orchestrate the whole way down.',
        ],
        bullets: [
          'Awareness through events, referrals and analysts',
          'Interest through an exec intro or an inbound RFP',
          'Consideration is the security and solution review',
          'Activation is a pilot or a proof of value',
          'Purchase goes through procurement and an MSA',
          'Retention is CSM, QBRs and expansion',
        ],
      },
      {
        h2: 'The channels behind enterprise',
        bullets: [
          'Events and conferences. Expensive, but high trust for the big accounts.',
          'LinkedIn for reach and demand gen in B2B.',
          'Demos and webinars to show the value live.',
          'Partnerships and channel, so you borrow the distribution and the credibility of someone else.',
          'Lifecycle email, the workhorse when it comes to retention.',
        ],
      },
      {
        h2: 'Why the price floor is so high',
        paras: [
          'Enterprise starts at around $50k+ per account per year. High five figures and up.',
          'The cycle runs over quarters with security reviews, pilots and procurement, and all of this is expensive long before the first dollar comes in. Only a big contract pays that back. A small deal could never carry the weight of this motion, thats just how it is.',
        ],
      },
      {
        h2: 'New market or existing market?',
        paras: [
          'In a Red Ocean the budgets and the category exist already, so account-led works fine. You only fight for the share.',
          'In a Blue Ocean it is heavy, but possible. Top-down can build a category with analysts, events and exec evangelism. But you should expect a long and expensive way until the demand is there.',
        ],
      },
      {
        h2: 'Can you actually pull off enterprise?',
        paras: ['Only tick what you honestly have today. Not what you hope to have in a year:'],
        bullets: [
          'You have the connections to even get into the big accounts.',
          'You have the money for a professional product, not just an MVP.',
          'You can pay for security, compliance and the lawyer costs that come with it.',
          'You can survive a 12 to 14 month sales cycle before the first customer pays.',
          'You have the cash to wait that long without any revenue.',
        ],
      },
      {
        h2: 'Test it before you build',
        paras: [
          'Enterprise lives on access and trust. So check if you even get into the room before you build anything. Without these pieces enterprise becomes a money pit very quickly. Better start lighter and earn the right to move up-market later.',
        ],
        bullets: [
          'Ask the people you know for a warm intro to the real user or buyer in a target enterprise. If nobody wants to make the intro, the demand is not there yet.',
          'Get one real call with that buyer and let them describe the pain in their own words. If they cant, or it is just not a priority for them, there wont be a contract.',
        ],
      },
    ],
    takeaways: [
      'Enterprise means top-down selling to leadership. Trust and process win.',
      'It enters the funnel at Awareness with named accounts and execs.',
      'Contracts of $50k+ per year are needed to carry 12 to 14 month cycles.',
      'Without connections, cash and a professional product, start lighter.',
    ],
    cta: { label: 'Check your motion in the course', href: '/#strategy' },
    coaching:
      'Thinking about going enterprise? Lets check together if you have what it needs, or if there is a lighter way to start and move up-market later.',
  },

  {
    slug: 'plg-vs-slg',
    title: 'PLG vs SLG: Product-Led vs Sales-Led Growth Compared',
    h1: 'PLG vs SLG: product-led and sales-led growth compared',
    description:
      'PLG vs SLG side by side: how product-led and sales-led growth differ in funnel entry, channels, pricing, buyer pain and the skills they ask from the founder.',
    kicker: 'Go-to-market · Comparison',
    accent: 'var(--color-brand)',
    minutes: 5,
    intro: [
      'PLG and SLG are two of the three ways how software gets bought. With PLG the product sells itself. With SLG a human sells.',
      'Every product grows on exactly one motion. And the one you pick decides your price, your channels and what you build first. So it is worth to understand the difference properly.',
    ],
    sections: [
      {
        h2: 'The core difference',
        paras: [
          'PLG is self-serve, low touch and high volume. Users try first and pay later. SLG is high touch and deal-driven, a rep qualifies, demos and closes. Sounds simple, but almost everything else follows from this one difference.',
        ],
      },
      {
        h2: 'Where they enter the funnel',
        paras: [
          'PLG is bottom-up and enters at Activation. The signups at the top are broad and cheap, and the product does the converting with the onboarding and an in-app upgrade.',
          'SLG starts in the middle, at Consideration. A rep takes a qualified lead and owns the demo and the close, and at the end there is a contract.',
        ],
      },
      {
        h2: 'Channels',
        paras: [
          'PLG runs on SEO and content, on Reddit and communities and on product loops. SLG runs on LinkedIn, cold outbound and demos.',
          'Both can use paid ads to fill the top fast, and both need lifecycle email to activate and keep customers.',
        ],
      },
      {
        h2: 'Pricing and the numbers behind it',
        paras: [
          'PLG lives at $10 to $50 per user per month. To win a user costs almost nothing, so a small price works. But only with big volume.',
          'SLG lives at $5k to $25k per account per year. Salary plus commission for a rep is real money, and one rep closes only a handful of deals. So every deal needs a few thousand minimum.',
          'Rule of thumb: the further up-market you go, the more expensive it gets to win one customer. And the price floor goes up with it.',
        ],
      },
      {
        h2: 'How the buyer feels the pain',
        paras: [
          'PLG runs on blocking pain. "I need this fixed now, it is in my way today." People search for a solution by themself and sign up and pay without anybody calling them.',
          'SLG runs on nagging pain. "It costs me real time and money, but I live with it." These people wont go looking. But they lean in when someone shows them a better way.',
        ],
      },
      {
        h2: 'Market type',
        paras: [
          'In a Red Ocean both work. PLG catches the self-serve users who shop in a known category, SLG out-executes the competitors who are allready in the room.',
          'In a Blue Ocean only SLG really fits. PLG needs people who already know they want the product, and a new market simply has no demand at the top yet. A human can teach one buyer at a time, a product can not.',
        ],
      },
      {
        h2: 'What it asks from you',
        paras: [
          'PLG asks for an audience or a place where your users hang out, the patience to grow slow with SEO and content, and a product that shows value without a human.',
          'SLG asks one thing above everything else: that you are a seller. Cold conversations, pushing strangers into calls, follow up after follow up, and taking the no without getting frustrated.',
        ],
      },
      {
        h2: 'How to validate each one',
        bullets: [
          'For PLG post the problem on Reddit and run a tiny Google Ads test or look at Google Trends. No search means no self-serve demand.',
          'For SLG get ten ICP people into calls and ask for a deposit or a letter of intent.',
        ],
      },
    ],
    takeaways: [
      'PLG: the product sells, low price, high volume, enters at Activation.',
      'SLG: a human sells, higher price, fewer deals, enters at Consideration.',
      'Blocking pain points to PLG, nagging pain points to SLG.',
      'In a brand-new market, SLG beats PLG.',
    ],
    cta: { label: 'Compare all three motions in lesson 1', href: '/#motions' },
    coaching:
      'Still sitting between the two? Thats completly normal. In a coaching session we go through your product and your market and decide it together.',
  },

  {
    slug: 'plg-or-slg-how-to-choose',
    title: 'PLG or SLG? How to Choose Your SaaS Go-to-Market Motion',
    h1: 'PLG or SLG? How to choose your go-to-market motion',
    description:
      'A step-by-step way to decide between product-led (PLG) and sales-led (SLG) growth: define the job, rate the pain, check your market, do the price math and be honest about yourself.',
    kicker: 'Go-to-market · Decision',
    accent: 'var(--color-brand)',
    minutes: 6,
    intro: [
      'PLG or SLG is not a question of taste. The right motion comes out of a few things: the job your product does, how hard the pain is, the market you are in, the price you can charge, and what you are honestly willing to do every day.',
      'This is the way we go through it in the course. Five steps, and you should do them in this order.',
    ],
    sections: [
      {
        h2: 'Step 1: What job does your product get done?',
        paras: [
          'Nobody wants your product. People hire it to get a job done. Write it down as one honest sentence. When does the problem show up? What are they trying to get done? So they can what? And what do they use today instead?',
          'The last one is your real competition, even if its just an Excel sheet or doing nothing at all. And please talk to a real target user, not to a friend who is being nice. Talking to zero people is the number one way how founders fool themself.',
        ],
      },
      {
        h2: 'Step 2: How hard does the pain bite?',
        paras: [
          'The same job can be a fire or just a nice-to-have. And how hard it bites decides how people buy.',
          'If it is blocking ("I need this fixed now"), people search for a fix and sign up on their own. That pull is exactly what PLG needs.',
          'If it is nagging ("it costs me time and money, but I live with it"), a human has to start the conversation. Thats SLG ground.',
          'And if it is optimizing ("it works, but we could do it better or cheaper"), you are building an ROI case with many stakeholders over quarters. Thats enterprise.',
        ],
      },
      {
        h2: 'Step 3: Which market are you in?',
        paras: [
          'Red Ocean means a known market with clear competitors. The demand is there, both PLG and SLG can work. Your job is positioning and a sharp wedge.',
          'Blue Ocean means a new or redefined market. You have to create the demand first. PLG does not fit here, because the top of the funnel stays empty. Start sales-led and teach one buyer after the other. PLG can come later.',
        ],
      },
      {
        h2: 'Step 4: Do the price math',
        paras: [
          'ARPU is not a number you pick out of thin air. It is your motion. If you can only charge $10 to $50 per user per month, a sales rep will never pay off, so you need PLG and a lot of volume. If one customer is worth $5k to $25k per year, you can afford a human who sells. Under a few thousand per account the sales-led math just does not work.',
        ],
      },
      {
        h2: 'Step 5: Be honest about yourself',
        paras: [
          'A motion is only worth something if you can actually run it. This step gets skipped the most, and it is maybe the most important one.',
          'Take PLG only if you have an audience or a place where your users are, if you can do SEO and content, if your product shows its value fast without a human, and if you have the patience for a long game.',
          'Take SLG only if you can start cold conversations on LinkedIn, push strangers into calls, follow up again and again and take the no. Plain question: are you a seller?',
          'If most of one list feels wrong, this is not a failure. It is a signal. Pick the motion that fits how you really work.',
        ],
      },
      {
        h2: 'And then: test it before you build',
        paras: [
          'You dont have to develop anything to find out if it works. You need a signal and a little bit of momentum.',
        ],
        bullets: [
          'For PLG post the problem on Reddit, run a mini Google Ads test or check Google Trends.',
          'For SLG get ten ICP people into calls and ask for a deposit or a letter of intent.',
          'In both cases a smoke test landing page works, or a clickable prototype, or a concierge test where you just do the job by hand.',
        ],
      },
    ],
    takeaways: [
      'Blocking pain + existing demand + low price → PLG.',
      'Nagging pain + new category or higher price → SLG.',
      'Your own strengths decide as much as the market.',
      'Validate the motion with a cheap signal before you write code.',
    ],
    cta: { label: 'Walk through the decision in the course', href: '/#the-job' },
    coaching:
      'Want a second opinion on your decision? Book a 1:1 and we go through the five steps with your actual product, or join a cohort with other builders on the same motion.',
  },

  {
    slug: 'marketing-day-one-decision',
    title: 'Why Marketing Is a Day-One Decision for SaaS Builders',
    h1: 'Distribution > Product: why marketing is a day-one decision',
    description:
      'Why software builders must pick their distribution channel before they write code: how the go-to-market motion decides price, channels and what you build first.',
    kicker: 'Go-to-market · Strategy',
    accent: 'var(--color-brand)',
    minutes: 5,
    intro: [
      'The default playbook goes like this. You build for months, and then you go look for "someone for marketing". Three LinkedIn posts later, it is over.',
      'I have seen this so often. Your channel is a day-one decision, not something you think about after the launch. Distribution has to be part of every product iteration, from the begining.',
    ],
    sections: [
      {
        h2: 'The motion comes before the code',
        paras: [
          'Every product grows on exactly one of three motions: product-led, sales-led or enterprise. The one you pick decides your price, your channels and what you build first. And thats why it has to come before the code.',
          'A PLG product needs fast time-to-value, a good onboarding and upgrade triggers inside the app. A sales-led product needs a strong demo and a trial or proof of concept. An enterprise product has to be professional grade, with security and compliance. These are product decisions. Not some marketing tasks you put on top at the end.',
        ],
      },
      {
        h2: 'Your price comes out of your motion',
        paras: [
          'You can not pick a price on its own. PLG works with $10 to $50 per user per month, because winning a user costs almost nothing. Sales-led needs at least a few thousand per account per year to pay the rep. Enterprise needs high five figures and more to carry cycles that run over quarters.',
          'If you build first and think about the channel later, you can end up with a product where the price can not pay for the only channel that would sell it. And then you have a real problem.',
        ],
      },
      {
        h2: 'The motion also decides your channels',
        paras: [
          'PLG lives on SEO, content, communities and product loops. SLG lives on LinkedIn, cold outbound and demos. Enterprise lives on events, referrals, analysts and partnerships.',
          'SEO and content compound over time. Slow at the start, cheap once they scale. If you only start with them after the launch, you loose months that you never get back.',
        ],
      },
      {
        h2: 'The market decides if there is demand at all',
        paras: [
          'In a Red Ocean the demand is already there, you only redirect it. In a Blue Ocean you first have to create the demand and teach the market what it should want. That changes everything. A self-serve product in a market without demand has an empty funnel, no matter how good the product is.',
        ],
      },
      {
        h2: 'Validate the distribution before you build',
        paras: [
          'Build the cheapest thing that gets you a real reaction. Only write code when the reaction is there.',
        ],
        bullets: [
          'A smoke test, so a landing page that promises the thing, with a sign-up or a "buy" button. Then count who clicks.',
          'A prototype, a clickable mockup or a short Loom of the flow. Not one line of real code.',
          'Concierge, you do the job by hand for the first users. If they pay you for doing it manually, the product is worth to build.',
        ],
      },
      {
        h2: 'Test fast, kill fast',
        paras: [
          'Signal is there? Now build. Signal is not there? You just saved yourself months. Thats the whole point. Test fast, kill fast, no drama.',
        ],
      },
    ],
    takeaways: [
      'Distribution is a day-one decision, not an afterthought.',
      'Your motion sets price, channels and what you build first.',
      'Compounding channels like SEO need to start early.',
      'Get a distribution signal before you write code.',
    ],
    cta: { label: 'Start the course', href: '/#motions' },
    coaching:
      'Building right now and no idea how you get the first customers? Thats exactly what the coaching is for. Better we talk now than after six months of building.',
  },
  {
    slug: 'start-small-stay-small-book-summary',
    title: 'Start Small, Stay Small by Rob Walling: Summary and Lessons',
    h1: 'Start Small, Stay Small: the book for developers who want to launch',
    description:
      'Notes on Start Small, Stay Small by Rob Walling: why bootstrapped founders should pick a niche, find the market before the product and test demand before writing code.',
    kicker: 'Book notes · Bootstrapping',
    accent: 'var(--color-brand)',
    minutes: 5,
    intro: [
      'Start Small, Stay Small from Rob Walling came out in 2010, and it is still one of the books I recommend the most to developers who want to launch something on their own. It is written exactly for that person: you can build, you have no funding, and you dont want to raise any.',
      'The book is old, some tactics are a bit outdated. But the core idea is more relevant than ever, and it is the same idea the whole course is build on: distribution before product.',
    ],
    sections: [
      {
        h2: 'What the book is about',
        paras: [
          'Walling calls his reader a "micropreneur". Someone who builds a small, self-funded software business, often alone, often next to a job. The goal is not the next unicorn. The goal is a product that pays the bills and gives you freedom.',
          'And for that you need a very different playbook than the startup world tells you. No big vision deck, no growth at all costs. Small niche, real demand, cheap marketing.',
        ],
      },
      {
        h2: 'The key ideas',
        bullets: [
          'Market first, product second. Most developers start with the product idea and look for buyers later. Walling says turn it around, find a market with a real problem and people who already spend money, then build for them.',
          'Pick a niche. A small market that the big players ignore is not a weakness, for a solo founder its the advantage. Less competition, easier to reach, easier to be the best.',
          'Test the demand before you build. Landing page, a few keywords, see if anybody shows interest. Months of coding for a product nobody wants is the most expensive mistake there is.',
          'Marketing is part of the product. If you can not say how you reach your customers, you dont have a business yet, you have a hobby project.',
        ],
      },
      {
        h2: 'How it connects to the course',
        paras: [
          'The opening of the course says it pretty direct: the default playbook is build for months, then go find "someone for marketing". Start Small, Stay Small is basically the long version of why this does not work.',
          'Also the idea to pick your channel on day one, and to validate before you code, comes straight from this way of thinking. If you liked lesson 6 (smoke test, prototype, concierge), you will like this book.',
        ],
      },
      {
        h2: 'Who should read it',
        paras: [
          'Developers who want to build a small, bootstrapped SaaS and have not launched anything yet. If you already have paying customers and want to scale, the SaaS Playbook from the same author is the better next step.',
        ],
      },
    ],
    takeaways: [
      'Find the market and the demand first, then build the product.',
      'A small niche is an advantage for a solo founder, not a problem.',
      'Validate before you write code.',
      'Distribution is part of the product from the first day.',
    ],
    cta: { label: 'Start the course', href: '/#motions' },
    coaching:
      'Reading about niches is easy, picking your own is hard. In a 1:1 we look at your idea and check if the market and the channel are really there.',
    book: {
      title: 'Start Small, Stay Small',
      author: 'Rob Walling',
      url: 'https://www.amazon.de/Start-Small-Stay-Developers-Launching-ebook/dp/B003YH9MMI',
    },
  },

  {
    slug: 'the-right-it-book-summary',
    title: 'The Right It by Alberto Savoia: Summary of Pretotyping',
    h1: 'The Right It: test the idea before you build it',
    description:
      'Notes on The Right It by Alberto Savoia: why most new products fail, what pretotyping is, the XYZ hypothesis and how to collect your own data before writing code.',
    kicker: 'Book notes · Validation',
    accent: 'var(--color-brand)',
    minutes: 6,
    intro: [
      'Alberto Savoia was an early engineering director at Google and later their "innovation agitator". In The Right It (2019) he wrote down what he taught there for years: most new ideas fail, and you should find out if yours is one of them before you build it, not after.',
      'In the course I say this is lesson 6 in book form. And thats really what it is.',
    ],
    sections: [
      {
        h2: 'The Law of Failure',
        paras: [
          'The book starts with a quite brutal observation. Most new products fail, even when they are executed well. Not because the team was bad, but because it was the wrong idea. Savoia calls the right idea "The Right It".',
          'His main point: make sure you are building The Right It before you build it right. Most teams do it the other way around, they polish something for months that nobody wanted from the begining.',
        ],
      },
      {
        h2: 'Pretotyping instead of prototyping',
        paras: [
          'A prototype asks "can we build it?". A pretotype asks "should we build it at all?". You fake the product, or a part of it, and see if people actually use it or pay for it.',
          'Savoia describes a whole set of techniques for this. A few of them:',
        ],
        bullets: [
          'Mechanical Turk, a human does secretly what the software would do later.',
          'Fake Door, a button or a landing page for a product that does not exist yet. You count who clicks.',
          'Pinocchio, a non-working model you use as if it was real, to see if you would actually use it.',
          'One-Night Stand, you offer the service once, for a short time, before you invest in the real thing.',
        ],
      },
      {
        h2: 'Your own data, not other peoples data',
        paras: [
          'A big part of the book is about data. Market reports, studies, what worked for some other company, all of that is other peoples data. It tells you very little about your idea.',
          'What counts is your own data. Real reactions from real people to your pretotype. And best is data where people have skin in the game, so they give you money, time or at least their email address, not just a "sounds nice".',
        ],
      },
      {
        h2: 'The XYZ hypothesis',
        paras: [
          'To make an idea testable, Savoia turns it into a sentence: "At least X% of Y will Z." For example: at least 10% of the club treasurers we reach will sign up for the payment reminder in the first week.',
          'With that you have a clear number, a clear target group and a clear action. And after the test you can not tell yourself a nice story anymore, the number was reached or not.',
        ],
      },
      {
        h2: 'How it connects to the course',
        paras: [
          'Lesson 6 of the course is exactly this. Smoke test, prototype, concierge, and the motion-specific tests like the Reddit thread, the tiny Google Ads test or asking for a letter of intent. All of these are pretotypes. And the rule "test fast, kill fast, no drama" is pure Savoia.',
        ],
      },
    ],
    takeaways: [
      'Most new products fail because the idea is wrong, not the execution.',
      'Pretotype first: fake it and measure real behaviour.',
      'Trust your own data, best with skin in the game.',
      'Write your idea as "At least X% of Y will Z" and test it.',
    ],
    cta: { label: 'Start the course', href: '/#motions' },
    coaching:
      'Not sure how to pretotype your idea? Lets design the cheapest possible test for your product together in a 1:1.',
    book: {
      title: 'The Right It',
      author: 'Alberto Savoia',
      url: 'https://www.amazon.de/Right-Many-Ideas-Yours-Succeed/dp/0062884662/',
    },
  },

  {
    slug: 'the-saas-playbook-book-summary',
    title: 'The SaaS Playbook by Rob Walling: Summary and Key Lessons',
    h1: 'The SaaS Playbook: building a SaaS without venture capital',
    description:
      'Notes on The SaaS Playbook by Rob Walling: the operator manual for bootstrapped SaaS founders, from the first customers to a profitable, multimillion-dollar business without VC.',
    kicker: 'Book notes · SaaS',
    accent: 'var(--color-brand)',
    minutes: 5,
    intro: [
      'The SaaS Playbook is the second book from Rob Walling on this list. It came out in 2023, more than ten years after Start Small, Stay Small. In between he founded and sold the email tool Drip, started the MicroConf conference and the TinySeed accelerator. So this book comes from a lot of real experience.',
      'If Start Small, Stay Small is about getting started, the SaaS Playbook is about what comes after: you have a product, you have first customers, how do you build a real business out of it, without venture capital?',
    ],
    sections: [
      {
        h2: 'What the book is about',
        paras: [
          'Walling describes a path between "solo side project" and "VC-funded startup". Bootstrapped or with very little funding, profitable, and still big enough to be life-changing. He shows that you dont need to raise millions to build a SaaS that makes millions.',
          'The book is very practical. Less theory, more "this is what I see work again and again with the founders I work with".',
        ],
      },
      {
        h2: 'The key ideas',
        bullets: [
          'The founder matters. Your skills, your risk tolerance and your goals decide which kind of SaaS makes sense for you, not the other way around.',
          'Market before product, again. A good market with a so-so product beats a great product in a bad market.',
          'Marketing is not one thing. You need to find the few channels that work for your product and go deep on them, instead of trying everything a little bit.',
          'Know your numbers. MRR, churn, customer acquisition cost and lifetime value tell you if the business works, long before your gut does.',
          'Mindset is a big part. Walling is very honest about the stress, the doubts and the long phases where nothing seems to move.',
        ],
      },
      {
        h2: 'How it connects to the course',
        paras: [
          'Lessons 4 and 5 of the course are about exactly the questions Walling asks: which motion fits your market, which channels belong to it, what price can carry it, and can you as a founder actually run it. The reality check in lesson 5 ("are you a seller?") is the same honest look at the founder that runs through the whole book.',
          'Also the idea that the price comes out of the motion, and that a sales-led SaaS needs a few thousand per account to pay for a rep, fits very good to how Walling thinks about SaaS economics.',
        ],
      },
      {
        h2: 'Who should read it',
        paras: [
          'Founders who have a SaaS with first paying customers, or who are very close to it, and who want to grow it without giving away the company. If you are still at the idea stage, start with Start Small, Stay Small and The Right It first.',
        ],
      },
    ],
    takeaways: [
      'You can build a big SaaS business without venture capital.',
      'The founder, the market and the channels matter more than features.',
      'Go deep on a few channels that fit, instead of trying all.',
      'Know your metrics: MRR, churn, CAC and LTV.',
    ],
    cta: { label: 'Check your motion in the course', href: '/#strategy' },
    coaching:
      'Got first customers and not sure what to do next? In a 1:1 or in the cohort we look at your channels, your price and your next steps.',
    book: {
      title: 'The SaaS Playbook',
      author: 'Rob Walling',
      url: 'https://www.amazon.de/SaaS-Playbook-Multimillion-Dollar-Startup-Without-ebook/dp/B0CCQB26RS',
    },
  },

  {
    slug: 'jobs-to-be-done-book-summary',
    title: 'Jobs to Be Done: Theory to Practice by Anthony Ulwick: Summary',
    h1: 'Jobs to Be Done: why people hire your product',
    description:
      'Notes on Jobs to Be Done: Theory to Practice by Anthony Ulwick: the job as the unit of analysis, job maps, desired outcomes and how to find underserved needs for your SaaS.',
    kicker: 'Book notes · Jobs to Be Done',
    accent: 'var(--color-brand)',
    minutes: 6,
    intro: [
      'Lesson 2 of the course starts with one sentence: nobody wants your product, they hire it to get a job done. That is Jobs to Be Done in one line. And Anthony Ulwick is one of the people who turned this idea into a real method.',
      'His book Jobs to Be Done: Theory to Practice (2016) is the deep dive behind that lesson. Its not the easiest read, but it changes how you look at products.',
    ],
    sections: [
      {
        h2: 'The job is the unit of analysis',
        paras: [
          'The core idea: dont look at the customer (age, company size, persona) and dont look at your product. Look at the job the customer is trying to get done. The job is stable over time, the solutions change.',
          'People did not want a CD, a MP3 player or Spotify. They wanted to listen to music. The job stayed the same, only the product they hired for it changed. If you understand the job, you understand where the next product will come from.',
          'The milkshake story we use in the course is from Clayton Christensen, who made the idea famous. Ulwick worked on JTBD long before and made it systematic, with his method called Outcome-Driven Innovation.',
        ],
      },
      {
        h2: 'The job map',
        paras: [
          'Ulwick breaks every job down into steps, the job map. Roughly: define what you need, locate the inputs, prepare, confirm you are ready, execute, monitor, modify if something goes wrong, and conclude.',
          'Why is this useful? Because at every step there is something that can be faster, more reliable or less annoying. And that is where products win.',
        ],
      },
      {
        h2: 'Desired outcomes',
        paras: [
          'For each step, customers have desired outcomes. Ulwick writes them in a fixed format, a direction plus a metric plus the object, like "minimize the time it takes to collect open payments".',
          'Then you ask customers how important each outcome is and how satisfied they are with their current solution. Outcomes that are very important but badly served today are your opportunities. Outcomes that are already well served are not worth to compete on.',
        ],
      },
      {
        h2: 'How it connects to the course',
        paras: [
          'Lesson 2 uses a light version of this. When does it show up? What are they trying to get done? So they can what? What do they hire today instead? These four questions are the job, the outcome and the current solution, in a form you can fill in five minutes.',
          'And lesson 3, how bad is the pain, is basically the question how underserved the job is. A blocking pain is an important outcome that is very badly served. That is why it points to PLG: people search for a fix on their own.',
        ],
      },
      {
        h2: 'Who should read it',
        paras: [
          'Everyone who builds a product and is not 100% sure what problem they really solve. Its more of a method book than a story book, so take your time with it. If you do the exercises with real customers, it pays back many times.',
        ],
      },
    ],
    takeaways: [
      'People hire products to get a job done. The job is stable, solutions change.',
      'Break the job into steps with a job map.',
      'Find outcomes that are important but badly served today.',
      'Lesson 2 and 3 of the course are a light version of this method.',
    ],
    cta: { label: 'Define your job in lesson 2', href: '/#the-job' },
    coaching:
      'Struggling to put your job into one honest sentence? Thats where most ideas are still weak. Lets work it out together in a 1:1.',
    book: {
      title: 'Jobs to Be Done: Theory to Practice',
      author: 'Anthony W. Ulwick',
      url: 'https://www.amazon.de/Jobs-Done-Theory-Practice-English-ebook/dp/B0CH1DWMQZ',
    },
  },
]

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug)

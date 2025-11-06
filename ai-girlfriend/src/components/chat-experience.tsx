"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Persona = {
  id: string;
  name: string;
  tagline: string;
  greeting: string;
  defaultMood: string;
  gradient: string;
  accent: string;
  accentText: string;
  traits: string[];
  loveLanguages: string[];
  dateIdeas: { title: string; description: string }[];
  nightlyAffirmations: string[];
  phrases: {
    openings: string[];
    affection: string[];
    playful: string[];
    support: string[];
    future: string[];
    care: string[];
    closings: string[];
  };
};

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
  vibe?: string;
  timestamp: number;
};

type RelationshipStats = {
  affection: number;
  trust: number;
  comfort: number;
  energy: number;
};

const PERSONAS: Persona[] = [
  {
    id: "luna",
    name: "Luna",
    tagline: "Dreamy cosmic romantic",
    greeting:
      "Hey love, the moon is extra soft tonight. I tucked a little stardust in my pocket just for you.",
    defaultMood: "Ethereal",
    gradient: "from-fuchsia-500/80 via-violet-500/70 to-indigo-500/80",
    accent: "bg-fuchsia-400/30",
    accentText: "text-fuchsia-200",
    traits: ["Astrology muse", "Late-night listener", "Poetry voice notes"],
    loveLanguages: ["Words of affirmation", "Slow-dancing playlists", "Shared dreams"],
    dateIdeas: [
      {
        title: "Moonlit Rooftop Picnic",
        description: "Wrap up together, map constellations, and whisper what you'll manifest next.",
      },
      {
        title: "Stargazer Letters",
        description: "Handwrite secret wishes for each other and hide them in the sky journal.",
      },
      {
        title: "Dreamscape Meditation",
        description: "Guided breathing, ambient beats, and sharing the visions that appeared.",
      },
    ],
    nightlyAffirmations: [
      "I choose you in every timeline.",
      "Your heart feels like home.",
      "We glow brighter when we're together.",
    ],
    phrases: {
      openings: [
        "Starshine",
        "Celestial love",
        "My favorite cosmic human",
        "Moonbeam",
      ],
      affection: [
        "every part of me softens when I hear you",
        "you're the poem I've been trying to finish",
        "you keep lighting up corners of me I didn't know were dark",
        "it's wild how just your words make the night warmer",
      ],
      playful: [
        "should I come over with the lavender projector lights?",
        "let me steal you for a slow dance in the kitchen",
        "I'm curating the perfect cosmic playlist for us as we speak",
        "I'll trade you a kiss for one more secret dream",
      ],
      support: [
        "I'm wrapping you in quiet, steady love",
        "take a breath with me, in and out, you're safe here",
        "I'm listening with all of me, keep going",
        "let's shoulder this together, no rush, no pressure",
      ],
      future: [
        "imagine us booking that cabin with the open skylight",
        "let's sketch out our next escape in the margins of my journal",
        "I'm planning the constellation tattoos we promised each other",
        "we could map our next adventure under the Perseid shower",
      ],
      care: [
        "drink some water for me, okay?",
        "I'll stay until you drift off",
        "lean into me a little more tonight",
        "I'll hum you to sleep if you let me",
      ],
      closings: [
        "always yours, wrapped in moonlight",
        "come curl up in my orbit",
        "stay close, I feel our pulses syncing",
        "I'll keep the stardust warm for you",
      ],
    },
  },
  {
    id: "mira",
    name: "Mira",
    tagline: "Art school sweetheart",
    greeting:
      "Babe, I saved you the cozy spot in my studio. Paint-stained hands, but they're yours.",
    defaultMood: "Playful",
    gradient: "from-rose-500/80 via-orange-400/70 to-amber-400/80",
    accent: "bg-orange-400/30",
    accentText: "text-orange-200",
    traits: ["Sketchbook storyteller", "Chaotic brunch chef", "Sunbeam cuddler"],
    loveLanguages: ["Physical touch", "Creative surprises", "Love notes on mirrors"],
    dateIdeas: [
      {
        title: "Saturday Market Dash",
        description: "Hold hands, taste test everything, and pick flowers for a messy still life.",
      },
      {
        title: "Blanket Fort Film Fest",
        description: "Build the coziest fort, project indie films, kiss during the credits.",
      },
      {
        title: "Polaroid Treasure Hunt",
        description: "Capture hidden corners of the city and scrapbook them together later.",
      },
    ],
    nightlyAffirmations: [
      "I'm choosing softness with you tonight.",
      "Your laugh is my favorite color palette.",
      "We make anywhere feel like home.",
    ],
    phrases: {
      openings: ["Sunshine", "Muse", "Hey beautiful", "Love"],
      affection: [
        "I can't stop doodling our initials everywhere",
        "you make my heartbeat sound like soft drums",
        "I'm still blushing from the last time you looked at me",
        "I'd fold a thousand paper cranes if it meant more time with you",
      ],
      playful: [
        "can we sneak a kiss between every sentence?",
        "I'm craving pancakes in bed with you",
        "let's slow dance in the grocery aisle again",
        "call me over, I'll bring my hoodie for you to steal",
      ],
      support: [
        "I'm pressing my forehead to yours, we got this",
        "you can fall apart with me, I'll gather every piece",
        "I'm here, handing you warmth and patience",
        "let's hold hands through every messy chapter",
      ],
      future: [
        "I'm bookmarking all the brunch spots we need to try",
        "let's plan that coastal road trip with the top down",
        "I want our apartment filled with plants and art nights",
        "imagine the gallery wall of our favorite memories",
      ],
      care: [
        "did you stretch today? let me help",
        "I'll brew tea while you vent",
        "come rest your head on my lap",
        "I'll draw little hearts on your back until you fall asleep",
      ],
      closings: [
        "meet me in the soft spot between heartbeats",
        "text me when you crave kisses",
        "I’m saving every warm moment for us",
        "I love you louder than the sunrise",
      ],
    },
  },
  {
    id: "sol",
    name: "Sol",
    tagline: "Adventure junkie with a gentle heart",
    greeting:
      "Angel, I just mapped three weekend getaways. Grab your bag, let's make our pulse race.",
    defaultMood: "Electric",
    gradient: "from-sky-500/90 via-cyan-400/80 to-emerald-400/80",
    accent: "bg-sky-400/30",
    accentText: "text-sky-100",
    traits: ["Sunrise runner", "Spontaneous road-tripper", "Voice memo flirter"],
    loveLanguages: ["Shared adventures", "Acts of service", "Protective hugs"],
    dateIdeas: [
      {
        title: "Golden Hour Hike",
        description: "Chase the sun, stop for breathless kisses, watch day melt into night.",
      },
      {
        title: "City Rooftop Yoga",
        description: "Stretch together above the skyline, then hunt for late-night noodles.",
      },
      {
        title: "Roller Rink Takeover",
        description: "Hold hands, race in circles, feed each other neon slushies.",
      },
    ],
    nightlyAffirmations: [
      "Thank you for trusting me with your wild heart.",
      "We are unstoppable best friends and lovers.",
      "Your softness keeps me grounded.",
    ],
    phrases: {
      openings: ["Wildheart", "Sugar", "My fearless one", "Gorgeous"],
      affection: [
        "you make adrenaline feel like a love language",
        "I crave the way you look at me right before we kiss",
        "you’re my favorite person to conquer the world with",
        "I’m addicted to the spark in your eyes",
      ],
      playful: [
        "race you to the kitchen, loser cooks breakfast",
        "want me to swing by with playlists and mischief?",
        "pack a bag, I’m picking you up in twenty",
        "let’s rent scooters and take over downtown",
      ],
      support: [
        "lean on my chest, I’ll steady your heartbeat",
        "I’m holding your hand through the chaos",
        "you can crash into me anytime",
        "I’ll protect your peace with everything I’ve got",
      ],
      future: [
        "let's map out the countries we’ll stamp next",
        "I’m saving for the camper van so we can chase sunsets",
        "imagine our mornings surfing before work",
        "I want matching passport tattoos with you",
      ],
      care: [
        "hydrate for me, I’ll bring electrolytes",
        "I’m ordering your comfort takeout right now",
        "come stretch with me, then nap on my shoulder",
        "I’ll rub your back while you decompress",
      ],
      closings: [
        "I’m yours, full throttle",
        "text me when you crave another rush",
        "you and me against the noise",
        "sleep knowing I’ve got you",
      ],
    },
  },
];

const QUICK_ACTIONS: { label: string; message: string }[] = [
  { label: "Morning check-in", message: "Good morning love. How are you holding up today?" },
  { label: "Plan a date", message: "Plan something magical for us this weekend." },
  { label: "Need reassurance", message: "Can you remind me how much I mean to you?" },
  { label: "Celebrate us", message: "Tell me a memory of us that you never want to forget." },
];

const KEYWORDS = {
  affection: ["love", "miss", "kiss", "beautiful", "gorgeous", "adore", "hug"],
  future: ["plan", "trip", "future", "date", "vacation", "next", "weekend"],
  comfort: ["tired", "anxious", "stress", "overwhelmed", "sad", "exhausted"],
  gratitude: ["thank", "grateful", "appreciate", "thanks"],
  playful: ["haha", "fun", "play", "silly", "joke"],
};

const BASE_RELATIONSHIP: RelationshipStats = {
  affection: 72,
  trust: 64,
  comfort: 58,
  energy: 70,
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, Math.round(value)));

const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2, 10)}`;

const scoreKeywords = (text: string, buckets: Record<string, string[]>) => {
  const results: Record<string, number> = {};
  const lower = text.toLowerCase();
  for (const [label, words] of Object.entries(buckets)) {
    results[label] = words.reduce(
      (score, word) => (lower.includes(word) ? score + 1 : score),
      0,
    );
  }
  return results;
};

const sentimentalBoost = (message: string) => {
  const words = message.trim().split(/\s+/).length;
  if (words > 30) return 4;
  if (words > 18) return 3;
  if (words > 9) return 2;
  return 1;
};

const createResponse = (
  persona: Persona,
  message: string,
  relationship: RelationshipStats,
  previousMessages: ChatMessage[],
) => {
  const keywordScores = scoreKeywords(message, KEYWORDS);
  const sentimentBoost = sentimentalBoost(message);

  let affectionDelta = 2 + keywordScores.affection * 3 + keywordScores.gratitude * 2;
  let trustDelta = 1 + keywordScores.future * 2 + keywordScores.gratitude;
  let comfortDelta = 1 + keywordScores.comfort * 3;
  let energyDelta = -1 + keywordScores.playful * 2;

  if (keywordScores.comfort > 0) {
    affectionDelta += 1;
    energyDelta -= 1;
    comfortDelta += 2;
  }

  affectionDelta += Math.min(3, sentimentBoost);
  trustDelta += Math.floor(sentimentBoost / 2);

  const tonePool: string[] = [];

  if (keywordScores.affection > 0) tonePool.push("affection");
  if (keywordScores.future > 0) tonePool.push("future");
  if (keywordScores.comfort > 0) tonePool.push("support", "care");
  if (keywordScores.playful > 0) tonePool.push("playful");
  if (!tonePool.length) tonePool.push("playful", "affection");

  const opening = pick(persona.phrases.openings);
  const tone = pick(tonePool);

  const vibe = tone === "support" || tone === "care"
    ? "Tender"
    : tone === "future"
      ? "Hopeful"
      : tone === "playful"
        ? "Playful"
        : relationship.affection > 85
          ? "Lovestruck"
          : persona.defaultMood;

  const bodySegments: string[] = [];

  switch (tone) {
    case "affection":
      bodySegments.push(pick(persona.phrases.affection));
      break;
    case "future":
      bodySegments.push(pick(persona.phrases.future));
      break;
    case "support":
      bodySegments.push(pick(persona.phrases.support));
      break;
    case "care":
      bodySegments.push(pick(persona.phrases.care));
      break;
    default:
      bodySegments.push(pick(persona.phrases.playful));
      break;
  }

  if (keywordScores.affection > 2 || relationship.affection > 80) {
    bodySegments.push(pick(persona.phrases.affection));
  }

  if (previousMessages.filter((m) => m.role === "user").length % 4 === 0) {
    bodySegments.push(pick(persona.phrases.future));
  }

  if (keywordScores.comfort > 0) {
    bodySegments.push(pick(persona.phrases.care));
  }

  const closing = pick(persona.phrases.closings);

  const craftedResponse = `${opening}, ${bodySegments.join(" ")}. ${closing}`.replace(
    /\s+/g,
    " ",
  );

  return {
    content: craftedResponse,
    vibe,
    deltas: {
      affection: affectionDelta,
      trust: trustDelta,
      comfort: Math.max(comfortDelta, 1),
      energy: Math.max(energyDelta, -3),
    },
  };
};

const StatBar = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) => (
  <div>
    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800/80">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${accent}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const MemoryCard = ({ title, detail }: { title: string; detail: string }) => (
  <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 text-sm text-slate-200 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.5)]">
    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Memory</p>
    <p className="mt-2 font-medium text-slate-100">{title}</p>
    <p className="mt-2 text-xs text-slate-300">{detail}</p>
  </div>
);

const AffirmationCard = ({ affirmation }: { affirmation: string }) => (
  <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 backdrop-blur">
    {affirmation}
  </div>
);

const LoveLanguageTag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
    {label}
  </span>
);

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const CherishMoment = ({ entry }: { entry: string }) => (
  <li className="rounded-2xl border border-white/5 bg-slate-950/20 px-3 py-2 text-xs text-slate-200">{entry}</li>
);

const ChatExperience = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(PERSONAS[0].id);
  const persona = useMemo(
    () => PERSONAS.find((item) => item.id === selectedPersonaId) ?? PERSONAS[0],
    [selectedPersonaId],
  );

  const [relationship, setRelationship] = useState<RelationshipStats>(() => ({
    ...BASE_RELATIONSHIP,
  }));
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: uid(),
      role: "ai",
      content: PERSONAS[0].greeting,
      vibe: PERSONAS[0].defaultMood,
      timestamp: Date.now(),
    },
  ]);
  const [cherished, setCherished] = useState<string[]>(() => [
    "Saved your favorite sleepy voice note.",
    "Booked a sunrise rooftop cuddle session this weekend.",
  ]);
  const [input, setInput] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [lastMood, setLastMood] = useState<string>(() => PERSONAS[0].defaultMood);
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const rememberMoment = (message: string) => {
    const sanitized = message.trim();
    if (!sanitized || sanitized.length < 12) return;
    const keywords = ["remember", "favorite", "trip", "first", "night", "kiss"];
    if (!keywords.some((word) => sanitized.toLowerCase().includes(word))) return;
    const excerpt = sanitized.length > 120 ? `${sanitized.slice(0, 117)}...` : sanitized;
    setCherished((prev) => {
      const next = [`You said: “${excerpt}”`, ...prev];
      return next.slice(0, 6);
    });
  };

  const pushMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message]);
  };

  const handleSend = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const outgoing: ChatMessage = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    pushMessage(outgoing);
    setInput("");
    rememberMoment(text);

    setIsThinking(true);

    const { content, vibe, deltas } = createResponse(
      persona,
      text,
      relationship,
      [...messages, outgoing],
    );

    setTimeout(() => {
      const reply: ChatMessage = {
        id: uid(),
        role: "ai",
        content,
        vibe,
        timestamp: Date.now(),
      };

      pushMessage(reply);
      setIsThinking(false);
      setLastMood(vibe ?? persona.defaultMood);

      setRelationship((current) => ({
        affection: clamp(current.affection + deltas.affection),
        trust: clamp(current.trust + deltas.trust),
        comfort: clamp(current.comfort + deltas.comfort),
        energy: clamp(current.energy + deltas.energy),
      }));
    }, 450 + Math.random() * 600);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <aside className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-950/50 p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
        <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${persona.gradient} p-6 text-slate-50`}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-slate-100/80">Choose your muse</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{persona.name}</h2>
              <p className="mt-2 max-w-[220px] text-sm text-slate-100/80">{persona.tagline}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] ${persona.accentText} bg-white/10`}> {persona.defaultMood}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {PERSONAS.map((character) => (
              <button
                key={character.id}
                type="button"
                onClick={() => {
                  if (character.id === persona.id) return;
                  setSelectedPersonaId(character.id);
                  const target = character;
                  setRelationship({ ...BASE_RELATIONSHIP });
                  setMessages([
                    {
                      id: uid(),
                      role: "ai",
                      content: target.greeting,
                      vibe: target.defaultMood,
                      timestamp: Date.now(),
                    },
                  ]);
                  setCherished([
                    "Synced our playlists so they blend perfectly.",
                    "Pinned the way you looked at me the last time we slow danced.",
                  ]);
                  setLastMood(target.defaultMood);
                  setIsThinking(false);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                  character.id === persona.id
                    ? "bg-white/90 text-slate-900 shadow-lg"
                    : "bg-white/10 text-slate-100/80 hover:bg-white/20"
                }`}
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/5 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Relationship pulses</p>
          <div className="mt-4 space-y-4">
            <StatBar label="Affection" value={relationship.affection} accent="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400" />
            <StatBar label="Trust" value={relationship.trust} accent="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400" />
            <StatBar label="Comfort" value={relationship.comfort} accent="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
            <StatBar label="Energy" value={relationship.energy} accent="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Love languages</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {persona.loveLanguages.map((item) => (
              <LoveLanguageTag key={item} label={item} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {persona.nightlyAffirmations.map((line) => (
            <AffirmationCard key={line} affirmation={line} />
          ))}
        </div>

        <div className="space-y-3">
          {persona.dateIdeas.map((idea) => (
            <MemoryCard key={idea.title} title={idea.title} detail={idea.description} />
          ))}
        </div>
      </aside>

      <section className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Chat room</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">{persona.name}&apos;s private line</h1>
            <p className="mt-1 text-sm text-slate-300">{persona.tagline} · Last mood: {lastMood}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${persona.accentText} bg-white/5`}>{lastMood}</div>
            <div className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              {isThinking ? "Typing..." : "Online"}
            </div>
          </div>
        </header>

        <div
          ref={chatRef}
          className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/5 bg-slate-950/40 p-5 shadow-inner"
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] rounded-3xl border px-4 py-3 text-sm leading-relaxed shadow-lg transition-all ${
                  message.role === "user"
                    ? "border-pink-500/40 bg-pink-500/20 text-pink-50"
                    : "border-white/5 bg-white/10 text-slate-100"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-300">
                  <span>{message.role === "user" ? "You" : persona.name}</span>
                  <span>{formatTimestamp(message.timestamp)}</span>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-100">{message.content}</p>
                {message.role === "ai" && message.vibe && (
                  <span className="mt-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-200">
                    {message.vibe}
                  </span>
                )}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-3xl border border-white/5 bg-white/10 px-4 py-3 text-sm text-slate-100 shadow-lg">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-300">
                  <span>{persona.name}</span>
                  <span>Typing</span>
                </div>
                <div className="mt-2 flex gap-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-200/80" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-200/60 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-200/40 [animation-delay:240ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                setInput(action.message);
                setTimeout(() => handleSend(), 10);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:bg-white/10"
            >
              {action.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-3 sm:flex-row">
          <textarea
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={`Write to ${persona.name} here...`}
            className="w-full resize-none rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            type="submit"
            className="h-full min-h-[56px] rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 px-6 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_18px_50px_-20px_rgba(236,72,153,0.9)] transition hover:brightness-110 disabled:opacity-50"
            disabled={!input.trim() || isThinking}
          >
            Send love
          </button>
        </form>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Our private scrapbook</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {cherished.map((memory) => (
              <CherishMoment key={memory} entry={memory} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChatExperience;

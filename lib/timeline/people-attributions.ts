import type { PersonRef, TimelineEvent } from "./schema";

/** Overlay: attach people to existing tech events (avoids duplicate "X creates Y" events). */
export const PEOPLE_ATTRIBUTIONS: Record<string, PersonRef[]> = {
  "git-created": [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
  "redis-first-released": [{ id: "salvatore-sanfilippo", name: "Salvatore Sanfilippo", role: "creator" }],
  "nodejs-first-released": [{ id: "ryan-dahl", name: "Ryan Dahl", role: "creator" }],
  "javascript-name-announced": [{ id: "brendan-eich", name: "Brendan Eich", role: "creator" }],
  "worldwideweb-browser": [{ id: "tim-berners-lee", name: "Tim Berners-Lee", role: "creator" }],
  "python-0-9-0-released": [{ id: "guido-van-rossum", name: "Guido van Rossum", role: "creator" }],
  "ruby-0-95-released": [{ id: "yukihiro-matsumoto", name: "Yukihiro Matsumoto", role: "creator" }],
  "java-announced": [{ id: "james-gosling", name: "James Gosling", role: "creator" }],
  "php-tools-1-0-released": [{ id: "rasmus-lerdorf", name: "Rasmus Lerdorf", role: "creator" }],
  "express-released": [{ id: "tj-holowaychuk", name: "TJ Holowaychuk", role: "creator" }],
  "vue-js-released": [{ id: "evan-you", name: "Evan You", role: "creator" }],
  "rails-open-sourced": [{ id: "david-heinemeier-hansson", name: "David Heinemeier Hansson", role: "creator" }],
  "laravel-first-beta": [{ id: "taylor-otwell", name: "Taylor Otwell", role: "creator" }],
  "nestjs-announced": [{ id: "kamil-mysliwiec", name: "Kamil Myśliwiec", role: "creator" }],
  "elixir-first-release": [{ id: "jose-valim", name: "José Valim", role: "creator" }],
  "phoenix-1-0-released": [{ id: "chris-mccord", name: "Chris McCord", role: "creator" }],
  "phoenix-liveview-released": [{ id: "jose-valim", name: "José Valim", role: "creator" }],
  "typescript-preview-released": [{ id: "anders-hejlsberg", name: "Anders Hejlsberg", role: "creator" }],
  "csharp-announced": [{ id: "anders-hejlsberg", name: "Anders Hejlsberg", role: "creator" }],
  "go-open-sourced": [
    { id: "robert-griesemer", name: "Robert Griesemer", role: "co-creator" },
    { id: "rob-pike", name: "Rob Pike", role: "co-creator" },
    { id: "ken-thompson", name: "Ken Thompson", role: "co-creator" },
  ],
  "rust-1-0-released": [{ id: "graydon-hoare", name: "Graydon Hoare", role: "creator" }],
  "swift-announced": [{ id: "chris-lattner", name: "Chris Lattner", role: "creator" }],
  "kotlin-unveiled": [{ id: "dmitry-jemerov", name: "Dmitry Jemerov", role: "co-creator" }],
  "django-open-sourced": [{ id: "adrian-holovaty", name: "Adrian Holovaty", role: "co-creator" }],
  "graphql-open-sourced": [{ id: "lee-byron", name: "Lee Byron", role: "co-creator" }],
  "react-open-sourced": [{ id: "jordan-walke", name: "Jordan Walke", role: "creator" }],
  "docker-open-sourced": [
    { id: "solomon-hykes", name: "Solomon Hykes", role: "creator" },
  ],
  "github-launched": [
    { id: "tom-preston-werner", name: "Tom Preston-Werner", role: "co-founder" },
    { id: "chris-wanstrath", name: "Chris Wanstrath", role: "co-founder" },
  ],
  "cobol-specifications-submitted": [{ id: "grace-hopper", name: "Grace Hopper", role: "researcher" }],
  "fortran-formally-published": [{ id: "john-backus", name: "John Backus", role: "researcher" }],
  "simula-67-presented": [
    { id: "ole-johan-dahl", name: "Ole-Johan Dahl", role: "creator" },
    { id: "kristen-nygaard", name: "Kristen Nygaard", role: "co-creator" },
  ],
  "chatgpt-released": [{ id: "sam-altman", name: "Sam Altman", role: "ceo" }],
  "claude-3-released": [{ id: "dario-amodei", name: "Dario Amodei", role: "ceo" }],
  "kubernetes-open-sourced": [
    { id: "joe-beda", name: "Joe Beda", role: "co-creator" },
    { id: "brendan-burns", name: "Brendan Burns", role: "co-creator" },
    { id: "craig-mcluckie", name: "Craig McLuckie", role: "co-creator" },
  ],
  "webpack-released": [{ id: "tobias-koppers", name: "Tobias Koppers", role: "creator" }],
  "npm-first-released": [{ id: "isaac-schlueter", name: "Isaac Schlueter", role: "creator" }],
  "hudson-ci-released": [{ id: "kohsuke-kawaguchi", name: "Kohsuke Kawaguchi", role: "creator" }],
  "nginx-released": [{ id: "igor-sysoev", name: "Igor Sysoev", role: "creator" }],
  "apache-http-server-released": [{ id: "brian-behlendorf", name: "Brian Behlendorf", role: "maintainer" }],
  "babel-released": [{ id: "sebastian-mckenzie", name: "Sebastian McKenzie", role: "creator" }],
  "eslint-released": [{ id: "nicholas-zakas", name: "Nicholas Zakas", role: "creator" }],
  "rollup-released": [{ id: "rich-harris", name: "Rich Harris", role: "creator" }],
  "vite-2-released": [{ id: "evan-you", name: "Evan You", role: "creator" }],
  "terraform-released": [{ id: "mitchell-hashimoto", name: "Mitchell Hashimoto", role: "creator" }],
  "vagrant-released": [{ id: "mitchell-hashimoto", name: "Mitchell Hashimoto", role: "creator" }],
  "ansible-released": [{ id: "michael-dehaan", name: "Michael DeHaan", role: "creator" }],
  "heroku-launched": [
    { id: "adam-wiggins", name: "Adam Wiggins", role: "co-founder" },
    { id: "james-lindenbaum", name: "James Lindenbaum", role: "co-founder" },
    { id: "orion-henry", name: "Orion Henry", role: "co-founder" },
  ],
  "travis-ci-launched": [
    { id: "mathias-meyer", name: "Mathias Meyer", role: "co-founder" },
    { id: "josh-lukaszewicz", name: "Josh Lukaszewicz", role: "co-founder" },
  ],
  "gitlab-released": [{ id: "dmitriy-zaporozhets", name: "Dmitriy Zaporozhets", role: "creator" }],
  "bitbucket-launched": [{ id: "jesper-noehr", name: "Jesper Noehr", role: "creator" }],
  "nextjs-open-sourced": [{ id: "guillermo-rauch", name: "Guillermo Rauch", role: "creator" }],
  "fastapi-released": [{ id: "sebastian-ramirez", name: "Sebastián Ramírez", role: "creator" }],
  "flask-released": [{ id: "armin-ronacher", name: "Armin Ronacher", role: "creator" }],
  "mosaic-1-0-released": [
    { id: "marc-andreessen", name: "Marc Andreessen", role: "co-creator" },
    { id: "eric-bina", name: "Eric Bina", role: "co-creator" },
  ],
  "rest-architectural-style-defined": [{ id: "roy-fielding", name: "Roy Fielding", role: "author" }],
  "tcp-ip-flag-day": [
    { id: "vint-cerf", name: "Vint Cerf", role: "researcher" },
    { id: "bob-kahn", name: "Bob Kahn", role: "researcher" },
  ],
  "bash-1-0-released": [{ id: "brian-fox", name: "Brian Fox", role: "creator" }],
  "oracle-2-released": [{ id: "larry-ellison", name: "Larry Ellison", role: "co-founder" }],
};

function mergePeople(existing: PersonRef[], overlay: PersonRef[]): PersonRef[] {
  const byId = new Map<string, PersonRef>();
  for (const person of existing) {
    byId.set(person.id, person);
  }
  for (const person of overlay) {
    byId.set(person.id, person);
  }
  return [...byId.values()];
}

export function enrichEventWithPeople(event: TimelineEvent): TimelineEvent {
  const overlay = PEOPLE_ATTRIBUTIONS[event.id];
  if (!overlay?.length && !event.people?.length) {
    return event;
  }
  return {
    ...event,
    people: mergePeople(event.people ?? [], overlay ?? []),
  };
}

export function eventInvolvesPerson(event: TimelineEvent, personId: string): boolean {
  return event.people?.some((person) => person.id === personId) ?? false;
}

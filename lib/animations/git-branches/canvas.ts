export type GitCommit = {
  pathIndex: number;
  t: number;
  pulse: number;
  born: number;
};

export type GitBranchPath = {
  points: Array<{ x: number; y: number }>;
  drawProgress: number;
  targetProgress: number;
  kind: "main" | "feature" | "merge";
  speed: number;
};

export type GitBranchesCanvasState = {
  width: number;
  height: number;
  branches: GitBranchPath[];
  commits: GitCommit[];
  scriptIndex: number;
  scriptWait: number;
  fadeOut: number;
};

const COLORS = {
  main: { r: 63, g: 185, b: 80 },
  feature: { r: 59, g: 130, b: 246 },
  merge: { r: 88, g: 166, b: 255 },
} as const;

const STROKE_OPACITY = {
  main: 0.11,
  feature: 0.09,
  merge: 0.08,
} as const;

const COMMIT_OPACITY = 0.18;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pathLength(points: Array<{ x: number; y: number }>) {
  let length = 0;

  for (let index = 1; index < points.length; index += 1) {
    const dx = points[index].x - points[index - 1].x;
    const dy = points[index].y - points[index - 1].y;
    length += Math.hypot(dx, dy);
  }

  return length;
}

function pointOnPath(points: Array<{ x: number; y: number }>, t: number) {
  const total = pathLength(points);
  if (total <= 0 || points.length === 0) {
    return { x: 0, y: 0 };
  }

  const target = clamp01(t) * total;
  let walked = 0;

  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const segment = Math.hypot(end.x - start.x, end.y - start.y);

    if (walked + segment >= target) {
      const local = segment === 0 ? 0 : (target - walked) / segment;
      return {
        x: lerp(start.x, end.x, local),
        y: lerp(start.y, end.y, local),
      };
    }

    walked += segment;
  }

  return points[points.length - 1];
}

function branchColor(kind: GitBranchPath["kind"]) {
  switch (kind) {
    case "main":
      return COLORS.main;
    case "merge":
      return COLORS.merge;
    default:
      return COLORS.feature;
  }
}

function branchOpacity(kind: GitBranchPath["kind"]) {
  switch (kind) {
    case "main":
      return STROKE_OPACITY.main;
    case "merge":
      return STROKE_OPACITY.merge;
    default:
      return STROKE_OPACITY.feature;
  }
}

function layoutForSize(width: number, height: number) {
  const baseY = height * 0.78;
  const left = width * 0.07;
  const right = width * 0.93;

  return { baseY, left, right };
}

function createMainBranch(width: number, height: number): GitBranchPath {
  const { baseY, left, right } = layoutForSize(width, height);

  return {
    points: [
      { x: left, y: baseY },
      { x: right, y: baseY },
    ],
    drawProgress: 0,
    targetProgress: 0,
    kind: "main",
    speed: 0.22,
  };
}

export function createGitBranchesCanvasState(width: number, height: number): GitBranchesCanvasState {
  return {
    width,
    height,
    branches: [createMainBranch(width, height)],
    commits: [],
    scriptIndex: 0,
    scriptWait: 0,
    fadeOut: 1,
  };
}

function addCommit(state: GitBranchesCanvasState, pathIndex: number, t: number) {
  state.commits.push({
    pathIndex,
    t,
    pulse: 0,
    born: 0,
  });
}

function createFeatureBranch(
  state: GitBranchesCanvasState,
  forkT: number,
): GitBranchPath | null {
  const main = state.branches[0];
  if (!main) {
    return null;
  }

  const fork = pointOnPath(main.points, forkT);
  const lift = state.height * (0.22 + Math.random() * 0.18);
  const landT = clamp01(forkT + 0.18 + Math.random() * 0.2);
  const land = pointOnPath(main.points, landT);

  return {
    points: [
      fork,
      { x: fork.x + state.width * 0.06, y: fork.y - lift * 0.55 },
      { x: land.x - state.width * 0.05, y: land.y - lift },
      land,
    ],
    drawProgress: 0,
    targetProgress: 1,
    kind: "feature",
    speed: 0.28,
  };
}

function runScriptStep(state: GitBranchesCanvasState) {
  const main = state.branches[0];
  if (!main) {
    return;
  }

  switch (state.scriptIndex % 8) {
    case 0:
      main.targetProgress = 0.32;
      state.scriptWait = 1400;
      break;
    case 1:
      addCommit(state, 0, main.drawProgress * 0.95);
      state.scriptWait = 500;
      break;
    case 2:
      main.targetProgress = 0.58;
      state.scriptWait = 1500;
      break;
    case 3: {
      const branch = createFeatureBranch(state, 0.42 + Math.random() * 0.08);
      if (branch) {
        state.branches.push(branch);
      }
      state.scriptWait = 2200;
      break;
    }
    case 4:
      addCommit(state, state.branches.length - 1, 0.55);
      state.scriptWait = 700;
      break;
    case 5:
      main.targetProgress = 0.82;
      state.scriptWait = 1600;
      break;
    case 6:
      addCommit(state, 0, main.drawProgress * 0.92);
      state.scriptWait = 600;
      break;
    case 7:
      main.targetProgress = 1;
      state.scriptWait = 1800;
      break;
    default:
      break;
  }

  state.scriptIndex += 1;
}

export function stepGitBranchesCanvasState(state: GitBranchesCanvasState, deltaMs: number) {
  if (state.fadeOut < 1) {
    state.fadeOut = Math.max(0, state.fadeOut - deltaMs / 900);

    if (state.fadeOut <= 0) {
      const fresh = createGitBranchesCanvasState(state.width, state.height);
      Object.assign(state, fresh);
    }

    return;
  }

  for (const branch of state.branches) {
    if (branch.drawProgress < branch.targetProgress) {
      branch.drawProgress = Math.min(
        branch.targetProgress,
        branch.drawProgress + (branch.speed * deltaMs) / 1000,
      );
    }
  }

  for (const commit of state.commits) {
    commit.born += deltaMs;
    commit.pulse = (Math.sin(commit.born / 320) + 1) / 2;
  }

  if (state.scriptWait > 0) {
    state.scriptWait -= deltaMs;

    if (state.scriptWait <= 0 && state.scriptIndex >= 8) {
      state.fadeOut = 0.999;
      return;
    }

    if (state.scriptWait > 0) {
      return;
    }
  }

  runScriptStep(state);
}

function drawBranch(
  ctx: CanvasRenderingContext2D,
  branch: GitBranchPath,
  globalAlpha: number,
) {
  const color = branchColor(branch.kind);
  const opacity = branchOpacity(branch.kind) * globalAlpha;
  const total = pathLength(branch.points);
  const drawTo = total * easeOutCubic(clamp01(branch.drawProgress));

  if (drawTo <= 0) {
    return;
  }

  let walked = 0;
  ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity.toFixed(3)})`;
  ctx.lineWidth = branch.kind === "main" ? 2 : 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(branch.points[0].x, branch.points[0].y);

  for (let index = 1; index < branch.points.length; index += 1) {
    const start = branch.points[index - 1];
    const end = branch.points[index];
    const segment = Math.hypot(end.x - start.x, end.y - start.y);

    if (walked + segment >= drawTo) {
      const local = (drawTo - walked) / segment;
      ctx.lineTo(lerp(start.x, end.x, local), lerp(start.y, end.y, local));
      break;
    }

    ctx.lineTo(end.x, end.y);
    walked += segment;
  }

  ctx.stroke();
}

export function renderGitBranchesCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GitBranchesCanvasState,
) {
  ctx.clearRect(0, 0, width, height);

  const globalAlpha = state.fadeOut;

  for (const branch of state.branches) {
    drawBranch(ctx, branch, globalAlpha);
  }

  for (const commit of state.commits) {
    const branch = state.branches[commit.pathIndex];
    if (!branch) {
      continue;
    }

    const point = pointOnPath(branch.points, commit.t);
    const color = branchColor(branch.kind);
    const radius = 3 + commit.pulse * 1.5;
    const alpha = COMMIT_OPACITY * globalAlpha * (0.7 + commit.pulse * 0.3);

    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

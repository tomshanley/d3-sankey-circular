let data2 = {
  nodes: [
    { name: "startA", col: 0 },
    { name: "startB", col: 0 },
    { name: "process1", col: 1 },
    { name: "process2", col: 1 },
    { name: "process3", col: 2 },
    { name: "process4", col: 2 },
    { name: "process5", col: 3 },
    { name: "process6", col: 4 },
    { name: "process7", col: 5 },
    { name: "process8", col: 6 },
    { name: "process9", col: 7 },
    { name: "process10", col: 6 },
    { name: "process11", col: 8 },
    { name: "process12", col: 6 },
    { name: "process13", col: 9 },
    { name: "process14", col: 9 },
    { name: "process15", col: 8 },
    { name: "process16", col: 9 },
    { name: "finishA", col: 10 },
    { name: "finishB", col: 10 },
  ],
  links: [
    { source: "startA", target: "process8", value: 20, optimal: "yes" },
    { source: "startA", target: "process5", value: 20, optimal: "yes" },
    { source: "startA", target: "process6", value: 20, optimal: "yes" },
    { source: "startB", target: "process1", value: 15, optimal: "yes" },
    { source: "startB", target: "process5", value: 15, optimal: "yes" },
    { source: "process1", target: "process4", value: 30, optimal: "yes" },
    { source: "process4", target: "process1", value: 10, optimal: "yes" },
    { source: "process2", target: "process7", value: 35, optimal: "yes" },
    { source: "process1", target: "process3", value: 20, optimal: "yes" },
    { source: "process5", target: "process1", value: 20, optimal: "yes" },
    { source: "process6", target: "startA", value: 5, optimal: "yes" },
    { source: "process4", target: "process2", value: 5, optimal: "yes" },
    { source: "process6", target: "process8", value: 15, optimal: "yes" },
    { source: "process4", target: "startB", value: 5, optimal: "yes" },
    { source: "process3", target: "process2", value: 15, optimal: "yes" },
    { source: "process3", target: "startB", value: 5, optimal: "yes" },
    { source: "process15", target: "process13", value: 10, optimal: "yes" },
    { source: "process13", target: "process9", value: 10, optimal: "yes" },
    { source: "process7", target: "startB", value: 20, optimal: "yes" },
    { source: "process8", target: "process1", value: 10, optimal: "yes" },
    { source: "process8", target: "process16", value: 10, optimal: "yes" },
    { source: "process16", target: "process9", value: 10, optimal: "yes" },
    { source: "process8", target: "process11", value: 25, optimal: "yes" },
    { source: "process11", target: "process10", value: 20, optimal: "yes" },
    { source: "process4", target: "process12", value: 10, optimal: "yes" },
    { source: "process12", target: "process11", value: 10, optimal: "yes" },
    { source: "process7", target: "process15", value: 15, optimal: "yes" },
    { source: "process15", target: "process14", value: 10, optimal: "yes" },
    { source: "process10", target: "process13", value: 10, optimal: "yes" },
    { source: "process10", target: "process16", value: 10, optimal: "yes" },
    { source: "process14", target: "finishB", value: 10, optimal: "yes" },
    { source: "process9", target: "finishA", value: 10, optimal: "yes" },
    { source: "process16", target: "process8", value: 10, optimal: "yes" },
    { source: "process9", target: "finishB", value: 10, optimal: "yes" },
    { source: "process15", target: "finishB", value: 10, optimal: "yes" },
    { source: "process15", target: "finishA", value: 10, optimal: "yes" },
    { source: "process11", target: "process15", value: 25, optimal: "yes" },
  ],
};

let data1 = {
  nodes: [
    { name: "start" },
    { name: "process0-0" },
    { name: "process0-1" },
    { name: "process0-2" },
    { name: "process0-3" },
    { name: "process0-4" },
    { name: "process0-5" },
    { name: "process0-6" },
    { name: "process0-7" },
    { name: "process0-8" },
    { name: "process0-9" },
    { name: "process1-0" },
    { name: "process1-1" },
    { name: "process1-2" },
    { name: "process1-3" },
    { name: "process1-4" },
    { name: "process1-5" },
    { name: "process1-6" },
    { name: "process1-7" },
    { name: "process1-8" },
    { name: "process1-9" },
    { name: "process2-0" },
    { name: "process2-1" },
    { name: "process2-2" },
    { name: "process2-3" },
    { name: "process2-4" },
    { name: "process2-5" },
    { name: "process2-6" },
    { name: "process2-7" },
    { name: "process2-8" },
    { name: "process2-9" },
    { name: "process3-0" },
    { name: "process3-1" },
    { name: "process3-2" },
    { name: "process3-3" },
    { name: "process3-4" },
    { name: "process3-5" },
    { name: "process3-6" },
    { name: "process3-7" },
    { name: "process3-8" },
    { name: "process3-9" },
    { name: "process4-0" },
    { name: "process4-1" },
    { name: "process4-2" },
    { name: "process4-3" },
    { name: "process4-4" },
    { name: "process4-5" },
    { name: "process4-6" },
    { name: "process4-7" },
    { name: "process4-8" },
    { name: "process4-9" },
    { name: "process5-0" },
    { name: "process5-1" },
    { name: "process5-2" },
    { name: "process5-3" },
    { name: "process5-4" },
    { name: "process5-5" },
    { name: "process5-6" },
    { name: "process5-7" },
    { name: "process5-8" },
    { name: "process5-9" },
    { name: "finish" },
  ],
  links: [
    { source: "start", target: "process0-0", value: 3 },
    { source: "start", target: "process0-1", value: 1 },
    { source: "start", target: "process0-2", value: 3 },
    { source: "start", target: "process0-3", value: 5 },
    { source: "start", target: "process0-4", value: 4 },
    { source: "start", target: "process0-5", value: 2 },
    { source: "start", target: "process0-6", value: 5 },
    { source: "start", target: "process0-7", value: 5 },
    { source: "start", target: "process0-8", value: 1 },
    { source: "start", target: "process0-9", value: 1 },
    { source: "process0-0", target: "process1-0", value: 3 },
    { source: "process0-0", target: "process1-7", value: 1 },
    { source: "process0-0", target: "process1-3", value: 5 },
    { source: "process0-0", target: "process1-3", value: 2 },
    { source: "process0-0", target: "process1-6", value: 4 },
    { source: "process0-1", target: "process1-5", value: 4 },
    { source: "process0-1", target: "process1-7", value: 2 },
    { source: "process0-1", target: "process1-4", value: 1 },
    { source: "process0-1", target: "process1-3", value: 4 },
    { source: "process0-1", target: "process1-7", value: 1 },
    { source: "process0-2", target: "process1-1", value: 3 },
    { source: "process0-2", target: "process1-0", value: 4 },
    { source: "process0-2", target: "process1-2", value: 2 },
    { source: "process0-2", target: "process1-1", value: 3 },
    { source: "process0-2", target: "process1-8", value: 1 },
    { source: "process0-3", target: "process1-4", value: 3 },
    { source: "process0-3", target: "process1-8", value: 1 },
    { source: "process0-3", target: "process1-5", value: 4 },
    { source: "process0-3", target: "process1-2", value: 3 },
    { source: "process0-3", target: "process1-2", value: 2 },
    { source: "process0-4", target: "process1-6", value: 4 },
    { source: "process0-4", target: "process1-1", value: 3 },
    { source: "process0-4", target: "process1-5", value: 5 },
    { source: "process0-4", target: "process1-2", value: 5 },
    { source: "process0-4", target: "process1-9", value: 4 },
    { source: "process0-5", target: "process1-7", value: 4 },
    { source: "process0-5", target: "process1-9", value: 4 },
    { source: "process0-5", target: "process1-5", value: 1 },
    { source: "process0-5", target: "process1-5", value: 2 },
    { source: "process0-5", target: "process1-3", value: 4 },
    { source: "process0-6", target: "process1-6", value: 2 },
    { source: "process0-6", target: "process1-4", value: 5 },
    { source: "process0-6", target: "process1-0", value: 2 },
    { source: "process0-6", target: "process1-9", value: 2 },
    { source: "process0-6", target: "process1-5", value: 3 },
    { source: "process0-7", target: "process1-7", value: 1 },
    { source: "process0-7", target: "process1-9", value: 3 },
    { source: "process0-7", target: "process1-1", value: 4 },
    { source: "process0-7", target: "process1-2", value: 5 },
    { source: "process0-7", target: "process1-2", value: 3 },
    { source: "process0-8", target: "process1-7", value: 3 },
    { source: "process0-8", target: "process1-7", value: 3 },
    { source: "process0-8", target: "process1-0", value: 3 },
    { source: "process0-8", target: "process1-6", value: 5 },
    { source: "process0-8", target: "process1-0", value: 1 },
    { source: "process0-9", target: "process1-3", value: 5 },
    { source: "process0-9", target: "process1-8", value: 5 },
    { source: "process0-9", target: "process1-2", value: 5 },
    { source: "process0-9", target: "process1-5", value: 2 },
    { source: "process0-9", target: "process1-7", value: 4 },
    { source: "process1-0", target: "process2-9", value: 3 },
    { source: "process1-0", target: "process2-4", value: 5 },
    { source: "process1-0", target: "process2-3", value: 1 },
    { source: "process1-0", target: "process2-0", value: 4 },
    { source: "process1-0", target: "process2-1", value: 1 },
    { source: "process1-1", target: "process2-4", value: 3 },
    { source: "process1-1", target: "process2-0", value: 3 },
    { source: "process1-1", target: "process2-5", value: 1 },
    { source: "process1-1", target: "process2-2", value: 4 },
    { source: "process1-1", target: "process2-9", value: 5 },
    { source: "process1-2", target: "process2-6", value: 3 },
    { source: "process1-2", target: "process2-1", value: 1 },
    { source: "process1-2", target: "process2-4", value: 4 },
    { source: "process1-2", target: "process2-9", value: 1 },
    { source: "process1-2", target: "process2-8", value: 3 },
    { source: "process1-3", target: "process2-5", value: 4 },
    { source: "process1-3", target: "process2-7", value: 5 },
    { source: "process1-3", target: "process2-4", value: 4 },
    { source: "process1-3", target: "process2-7", value: 5 },
    { source: "process1-3", target: "process2-0", value: 3 },
    { source: "process1-4", target: "process2-8", value: 3 },
    { source: "process1-4", target: "process2-7", value: 3 },
    { source: "process1-4", target: "process2-4", value: 2 },
    { source: "process1-4", target: "process2-2", value: 5 },
    { source: "process1-4", target: "process2-9", value: 3 },
    { source: "process1-5", target: "process2-2", value: 1 },
    { source: "process1-5", target: "process2-8", value: 5 },
    { source: "process1-5", target: "process2-3", value: 3 },
    { source: "process1-5", target: "process2-5", value: 4 },
    { source: "process1-5", target: "process2-4", value: 3 },
    { source: "process1-6", target: "process2-6", value: 5 },
    { source: "process1-6", target: "process2-2", value: 3 },
    { source: "process1-6", target: "process2-7", value: 4 },
    { source: "process1-6", target: "process2-6", value: 5 },
    { source: "process1-6", target: "process2-3", value: 5 },
    { source: "process1-7", target: "process2-4", value: 4 },
    { source: "process1-7", target: "process2-8", value: 3 },
    { source: "process1-7", target: "process2-6", value: 1 },
    { source: "process1-7", target: "process2-9", value: 3 },
    { source: "process1-7", target: "process2-0", value: 5 },
    { source: "process1-8", target: "process2-9", value: 5 },
    { source: "process1-8", target: "process2-7", value: 1 },
    { source: "process1-8", target: "process2-4", value: 1 },
    { source: "process1-8", target: "process2-8", value: 3 },
    { source: "process1-8", target: "process2-8", value: 2 },
    { source: "process1-9", target: "process2-0", value: 2 },
    { source: "process1-9", target: "process2-9", value: 2 },
    { source: "process1-9", target: "process2-5", value: 5 },
    { source: "process1-9", target: "process2-6", value: 4 },
    { source: "process1-9", target: "process2-2", value: 3 },
    { source: "process2-0", target: "process3-8", value: 5 },
    { source: "process2-0", target: "process3-2", value: 4 },
    { source: "process2-0", target: "process3-3", value: 2 },
    { source: "process2-0", target: "process3-5", value: 5 },
    { source: "process2-0", target: "process3-2", value: 1 },
    { source: "process2-1", target: "process3-5", value: 5 },
    { source: "process2-1", target: "process3-2", value: 3 },
    { source: "process2-1", target: "process3-7", value: 2 },
    { source: "process2-1", target: "process3-6", value: 5 },
    { source: "process2-1", target: "process3-9", value: 3 },
    { source: "process2-2", target: "process3-2", value: 4 },
    { source: "process2-2", target: "process3-4", value: 1 },
    { source: "process2-2", target: "process3-7", value: 4 },
    { source: "process2-2", target: "process3-2", value: 3 },
    { source: "process2-2", target: "process3-9", value: 2 },
    { source: "process2-3", target: "process3-4", value: 4 },
    { source: "process2-3", target: "process3-3", value: 2 },
    { source: "process2-3", target: "process3-0", value: 1 },
    { source: "process2-3", target: "process3-5", value: 2 },
    { source: "process2-3", target: "process3-8", value: 4 },
    { source: "process2-4", target: "process3-1", value: 3 },
    { source: "process2-4", target: "process3-1", value: 3 },
    { source: "process2-4", target: "process3-1", value: 3 },
    { source: "process2-4", target: "process3-4", value: 2 },
    { source: "process2-4", target: "process3-4", value: 4 },
    { source: "process2-5", target: "process3-8", value: 4 },
    { source: "process2-5", target: "process3-2", value: 5 },
    { source: "process2-5", target: "process3-4", value: 2 },
    { source: "process2-5", target: "process3-1", value: 5 },
    { source: "process2-5", target: "process3-4", value: 4 },
    { source: "process2-6", target: "process3-5", value: 4 },
    { source: "process2-6", target: "process3-6", value: 4 },
    { source: "process2-6", target: "process3-7", value: 5 },
    { source: "process2-6", target: "process3-9", value: 1 },
    { source: "process2-6", target: "process3-9", value: 4 },
    { source: "process2-7", target: "process3-1", value: 3 },
    { source: "process2-7", target: "process3-5", value: 3 },
    { source: "process2-7", target: "process3-8", value: 1 },
    { source: "process2-7", target: "process3-4", value: 3 },
    { source: "process2-7", target: "process3-9", value: 5 },
    { source: "process2-8", target: "process3-7", value: 2 },
    { source: "process2-8", target: "process3-5", value: 3 },
    { source: "process2-8", target: "process3-5", value: 3 },
    { source: "process2-8", target: "process3-2", value: 2 },
    { source: "process2-8", target: "process3-1", value: 4 },
    { source: "process2-9", target: "process3-4", value: 3 },
    { source: "process2-9", target: "process3-5", value: 2 },
    { source: "process2-9", target: "process3-3", value: 2 },
    { source: "process2-9", target: "process3-1", value: 3 },
    { source: "process2-9", target: "process3-7", value: 3 },
    { source: "process3-0", target: "process4-5", value: 3 },
    { source: "process3-0", target: "process4-6", value: 1 },
    { source: "process3-0", target: "process4-4", value: 1 },
    { source: "process3-0", target: "process4-3", value: 5 },
    { source: "process3-0", target: "process4-4", value: 5 },
    { source: "process3-1", target: "process4-0", value: 4 },
    { source: "process3-1", target: "process4-8", value: 1 },
    { source: "process3-1", target: "process4-0", value: 2 },
    { source: "process3-1", target: "process4-8", value: 1 },
    { source: "process3-1", target: "process4-7", value: 5 },
    { source: "process3-2", target: "process4-5", value: 5 },
    { source: "process3-2", target: "process4-9", value: 3 },
    { source: "process3-2", target: "process4-5", value: 2 },
    { source: "process3-2", target: "process4-6", value: 2 },
    { source: "process3-2", target: "process4-2", value: 4 },
    { source: "process3-3", target: "process4-6", value: 2 },
    { source: "process3-3", target: "process4-3", value: 4 },
    { source: "process3-3", target: "process4-0", value: 3 },
    { source: "process3-3", target: "process4-3", value: 4 },
    { source: "process3-3", target: "process4-5", value: 3 },
    { source: "process3-4", target: "process4-2", value: 4 },
    { source: "process3-4", target: "process4-4", value: 4 },
    { source: "process3-4", target: "process4-6", value: 3 },
    { source: "process3-4", target: "process4-9", value: 3 },
    { source: "process3-4", target: "process4-1", value: 5 },
    { source: "process3-5", target: "process4-7", value: 3 },
    { source: "process3-5", target: "process4-9", value: 4 },
    { source: "process3-5", target: "process4-8", value: 4 },
    { source: "process3-5", target: "process4-3", value: 3 },
    { source: "process3-5", target: "process4-0", value: 4 },
    { source: "process3-6", target: "process4-8", value: 5 },
    { source: "process3-6", target: "process4-9", value: 1 },
    { source: "process3-6", target: "process4-3", value: 2 },
    { source: "process3-6", target: "process4-7", value: 4 },
    { source: "process3-6", target: "process4-8", value: 1 },
    { source: "process3-7", target: "process4-1", value: 1 },
    { source: "process3-7", target: "process4-2", value: 3 },
    { source: "process3-7", target: "process4-1", value: 4 },
    { source: "process3-7", target: "process4-4", value: 5 },
    { source: "process3-7", target: "process4-2", value: 4 },
    { source: "process3-8", target: "process4-4", value: 4 },
    { source: "process3-8", target: "process4-5", value: 4 },
    { source: "process3-8", target: "process4-7", value: 2 },
    { source: "process3-8", target: "process4-7", value: 1 },
    { source: "process3-8", target: "process4-5", value: 4 },
    { source: "process3-9", target: "process4-8", value: 4 },
    { source: "process3-9", target: "process4-7", value: 2 },
    { source: "process3-9", target: "process4-5", value: 2 },
    { source: "process3-9", target: "process4-0", value: 2 },
    { source: "process3-9", target: "process4-9", value: 5 },
    { source: "process4-0", target: "process5-3", value: 5 },
    { source: "process4-0", target: "process5-6", value: 3 },
    { source: "process4-0", target: "process5-5", value: 5 },
    { source: "process4-0", target: "process5-0", value: 3 },
    { source: "process4-0", target: "process5-8", value: 4 },
    { source: "process4-1", target: "process5-2", value: 3 },
    { source: "process4-1", target: "process5-3", value: 2 },
    { source: "process4-1", target: "process5-7", value: 5 },
    { source: "process4-1", target: "process5-1", value: 2 },
    { source: "process4-1", target: "process5-3", value: 5 },
    { source: "process4-2", target: "process5-0", value: 1 },
    { source: "process4-2", target: "process5-1", value: 5 },
    { source: "process4-2", target: "process5-9", value: 5 },
    { source: "process4-2", target: "process5-3", value: 1 },
    { source: "process4-2", target: "process5-4", value: 4 },
    { source: "process4-3", target: "process5-6", value: 3 },
    { source: "process4-3", target: "process5-7", value: 3 },
    { source: "process4-3", target: "process5-0", value: 4 },
    { source: "process4-3", target: "process5-9", value: 3 },
    { source: "process4-3", target: "process5-9", value: 1 },
    { source: "process4-4", target: "process5-4", value: 4 },
    { source: "process4-4", target: "process5-8", value: 2 },
    { source: "process4-4", target: "process5-4", value: 2 },
    { source: "process4-4", target: "process5-3", value: 4 },
    { source: "process4-4", target: "process5-6", value: 2 },
    { source: "process4-5", target: "process5-5", value: 1 },
    { source: "process4-5", target: "process5-1", value: 1 },
    { source: "process4-5", target: "process5-1", value: 4 },
    { source: "process4-5", target: "process5-6", value: 3 },
    { source: "process4-5", target: "process5-9", value: 5 },
    { source: "process4-6", target: "process5-3", value: 3 },
    { source: "process4-6", target: "process5-2", value: 4 },
    { source: "process4-6", target: "process5-0", value: 5 },
    { source: "process4-6", target: "process5-7", value: 1 },
    { source: "process4-6", target: "process5-2", value: 5 },
    { source: "process4-7", target: "process5-6", value: 5 },
    { source: "process4-7", target: "process5-5", value: 1 },
    { source: "process4-7", target: "process5-8", value: 1 },
    { source: "process4-7", target: "process5-1", value: 3 },
    { source: "process4-7", target: "process5-9", value: 2 },
    { source: "process4-8", target: "process5-3", value: 5 },
    { source: "process4-8", target: "process5-1", value: 3 },
    { source: "process4-8", target: "process5-8", value: 4 },
    { source: "process4-8", target: "process5-4", value: 5 },
    { source: "process4-8", target: "process5-4", value: 4 },
    { source: "process4-9", target: "process5-0", value: 4 },
    { source: "process4-9", target: "process5-0", value: 2 },
    { source: "process4-9", target: "process5-1", value: 2 },
    { source: "process4-9", target: "process5-7", value: 1 },
    { source: "process4-9", target: "process5-7", value: 4 },
    { source: "process5-0", target: "finish", value: 4 },
    { source: "process5-1", target: "finish", value: 2 },
    { source: "process5-2", target: "finish", value: 5 },
    { source: "process5-3", target: "finish", value: 1 },
    { source: "process5-4", target: "finish", value: 1 },
    { source: "process5-5", target: "finish", value: 3 },
    { source: "process5-6", target: "finish", value: 1 },
    { source: "process5-7", target: "finish", value: 5 },
    { source: "process5-8", target: "finish", value: 4 },
    { source: "process5-8", target: "process1-2", value: 4 },
    { source: "process5-9", target: "finish", value: 4 },
  ],
};

let data3 = {
  nodes: [
    { name: "Oceans" },
    { name: "Evaporation" },
    { name: "Atmosphere" },
    { name: "Condensation" },
    { name: "Precipitation" },
    { name: "Ice and snow" },
    { name: "Infiltration" },
    { name: "Seepage" },
    { name: "Spring" },
    { name: "Freshwater" },
    // { "name": "Soil moisture" },
    { name: "Plants and animals" },
    { name: "Sublimation" },
    { name: "Groundwater flow" },
    { name: "Groundwater storage" },
    { name: "Surface runoff" },
    { name: "Plant uptake" },
    { name: "Evapotranspiration" },
  ],
  links: [
    { source: "Oceans", target: "Evaporation", value: 4 },
    { source: "Evaporation", target: "Condensation", value: 4 },
    { source: "Condensation", target: "Atmosphere", value: 4 },
    { source: "Atmosphere", target: "Precipitation", value: 4 },
    { source: "Precipitation", target: "Ice and snow", value: 4 },
    { source: "Precipitation", target: "Oceans", value: 4 },
    { source: "Precipitation", target: "Surface runoff", value: 4 },
    { source: "Ice and snow", target: "Infiltration", value: 4 },
    { source: "Ice and snow", target: "Sublimation", value: 4 },
    { source: "Sublimation", target: "Atmosphere", value: 4 },
    { source: "Infiltration", target: "Groundwater flow", value: 4 },
    { source: "Infiltration", target: "Groundwater storage", value: 4 },
    { source: "Groundwater storage", target: "Oceans", value: 4 },
    { source: "Groundwater flow", target: "Seepage", value: 4 },
    { source: "Groundwater flow", target: "Spring", value: 4 },
    { source: "Groundwater flow", target: "Plant uptake", value: 4 },
    { source: "Groundwater flow", target: "Oceans", value: 4 },
    { source: "Groundwater flow", target: "Freshwater", value: 4 },
    { source: "Seepage", target: "Freshwater", value: 4 },
    { source: "Spring", target: "Freshwater", value: 4 },
    { source: "Freshwater", target: "Evaporation", value: 4 },
    { source: "Freshwater", target: "Plants and animals", value: 4 },
    { source: "Freshwater", target: "Seepage", value: 4 },
    { source: "Plant uptake", target: "Plants and animals", value: 4 },
    { source: "Plants and animals", target: "Freshwater", value: 4 },
    { source: "Surface runoff", target: "Groundwater flow", value: 4 },
    { source: "Plants and animals", target: "Evapotranspiration", value: 4 },
    { source: "Evapotranspiration", target: "Atmosphere", value: 4 },
    { source: "Freshwater", target: "Oceans", value: 4 },
  ],
};

//https://www.ucl.ac.uk/bartlett/sustainable/news/2017/jun/global-paper-recycling-can-be-improved-according-new-research-ucl
let data4 = {
  nodes: [
    { name: "Non-fibrous" },
    { name: "Wood" },
    { name: "Other fibres" },
    { name: "Mechanical pulp" },
    { name: "Chemical pulp" },
    { name: "Recycled pulp" },
    //{ "name": "Paper for recycling" },
    { name: "Mill waste" },
    { name: "Newsprint" },
    { name: "Printing and writing" },
    { name: "Sanitary and household" },
    { name: "Packaging" },
    { name: "Other" },
    { name: "Use" },
    { name: "To stock" },
    { name: "Energy recovery municipal" },
    { name: "Incineration municipal" },
    { name: "Landfill" },
    { name: "Non-energy recovery" },
    { name: "Energy recovery on site" },
  ],
  links: [
    { source: "Non-fibrous", target: "Newsprint", value: 4 },
    { source: "Non-fibrous", target: "Printing and writing", value: 40 },
    { source: "Non-fibrous", target: "Packaging", value: 20 },
    { source: "Non-fibrous", target: "Other", value: 4 },
    { source: "Non-fibrous", target: "Recycled pulp", value: 2 },

    { source: "Wood", target: "Mechanical pulp", value: 35 },
    { source: "Wood", target: "Chemical pulp", value: 279 },

    { source: "Other fibres", target: "Chemical pulp", value: 4 },

    { source: "Mechanical pulp", target: "Newsprint", value: 3 },
    { source: "Mechanical pulp", target: "Packaging", value: 23 },
    { source: "Mechanical pulp", target: "Recycled pulp", value: 2 },
    { source: "Mechanical pulp", target: "Mill waste", value: 3 },

    { source: "Chemical pulp", target: "Printing and writing", value: 50 },
    { source: "Chemical pulp", target: "Sanitary and household", value: 20 },
    { source: "Chemical pulp", target: "Packaging", value: 40 },
    { source: "Chemical pulp", target: "Other", value: 9 },
    { source: "Chemical pulp", target: "Recycled pulp", value: 3 },
    { source: "Chemical pulp", target: "Mill waste", value: 162 },

    { source: "Recycled pulp", target: "Newsprint", value: 25 },
    { source: "Recycled pulp", target: "Printing and writing", value: 5 },
    { source: "Recycled pulp", target: "Sanitary and household", value: 5 },
    { source: "Recycled pulp", target: "Packaging", value: 100 },
    { source: "Recycled pulp", target: "Other", value: 5 },
    { source: "Recycled pulp", target: "Mill waste", value: 41 },
    //{ "source": "Recycled pulp", "target": "Paper for recycling", "value": 3 },

    { source: "Newsprint", target: "Use", value: 31 },
    { source: "Printing and writing", target: "Use", value: 106 },
    { source: "Sanitary and household", target: "Use", value: 30 },
    { source: "Packaging", target: "Use", value: 214 },
    { source: "Other", target: "Use", value: 18 },

    { source: "Use", target: "To stock", value: 36 },
    { source: "Use", target: "Energy recovery municipal", value: 20 },
    { source: "Use", target: "Incineration municipal", value: 14 },
    { source: "Use", target: "Landfill", value: 132 },
    { source: "Use", target: "Non-energy recovery", value: 3 },
    { source: "Use", target: "Recycled pulp", value: 194 },

    { source: "Mill waste", target: "Landfill", value: 22 },
    { source: "Mill waste", target: "Non-energy recovery", value: 26 },
    { source: "Mill waste", target: "Energy recovery on site", value: 158 },

    //{ "source": "Paper for recycling", "target": "Recycled pulp", "value": 215 },
  ],
};

//to test self-linking nodes
let data5 = {
  nodes: [
    { name: "startA" },
    { name: "startB" },
    { name: "process1" },
    { name: "process2" },
    { name: "process3" },
    { name: "process4" },
    { name: "process5" },
    { name: "process6" },
    { name: "process7" },
    { name: "process8" },
    { name: "process9" },
    { name: "process10" },
    { name: "process11" },
    { name: "process12" },
    { name: "process13" },
    { name: "process14" },
    { name: "process15" },
    { name: "process16" },
    { name: "finishA" },
    { name: "finishB" },
  ],
  links: [
    { source: "startA", target: "process8", value: 20, optimal: "yes" },
    { source: "startA", target: "process5", value: 20, optimal: "yes" },
    { source: "startA", target: "process6", value: 20, optimal: "yes" },
    { source: "startB", target: "process1", value: 15, optimal: "yes" },
    { source: "startB", target: "process5", value: 15, optimal: "yes" },
    { source: "process1", target: "process4", value: 30, optimal: "yes" },
    { source: "process4", target: "process1", value: 10, optimal: "yes" },
    { source: "process2", target: "process7", value: 35, optimal: "yes" },
    { source: "process1", target: "process3", value: 20, optimal: "yes" },
    { source: "process5", target: "process1", value: 20, optimal: "yes" },
    { source: "process6", target: "startA", value: 5, optimal: "yes" },
    { source: "process4", target: "process2", value: 10, optimal: "yes" },
    { source: "process6", target: "process8", value: 15, optimal: "yes" },
    //{ "source": "process4", "target": "startB", "value": 5, "optimal": "yes" },
    { source: "process3", target: "process2", value: 15, optimal: "yes" },
    //{ "source": "process3", "target": "startB", "value": 5, "optimal": "yes" },
    { source: "process15", target: "process13", value: 10, optimal: "yes" },
    { source: "process13", target: "process9", value: 10, optimal: "yes" },
    { source: "process7", target: "startB", value: 20, optimal: "yes" },
    { source: "process8", target: "process1", value: 10, optimal: "yes" },
    { source: "process8", target: "process16", value: 10, optimal: "yes" },
    { source: "process16", target: "process9", value: 10, optimal: "yes" },
    { source: "process8", target: "process11", value: 25, optimal: "yes" },
    { source: "process11", target: "process10", value: 20, optimal: "yes" },
    { source: "process4", target: "process12", value: 10, optimal: "yes" },
    { source: "process12", target: "process11", value: 10, optimal: "yes" },
    { source: "process7", target: "process15", value: 15, optimal: "yes" },
    { source: "process15", target: "process14", value: 10, optimal: "yes" },
    { source: "process10", target: "process13", value: 10, optimal: "yes" },
    { source: "process10", target: "process16", value: 10, optimal: "yes" },
    { source: "process14", target: "finishB", value: 10, optimal: "yes" },
    { source: "process9", target: "finishA", value: 10, optimal: "yes" },
    { source: "process16", target: "process8", value: 10, optimal: "yes" },
    { source: "process9", target: "finishB", value: 10, optimal: "yes" },
    { source: "process15", target: "finishB", value: 10, optimal: "yes" },
    { source: "process15", target: "finishA", value: 10, optimal: "yes" },
    { source: "process11", target: "process15", value: 25, optimal: "yes" },
    { source: "process11", target: "process11", value: 5, optimal: "yes" },
    { source: "finishA", target: "finishA", value: 15, optimal: "yes" },
    { source: "finishB", target: "finishB", value: 15, optimal: "yes" },
    { source: "process5", target: "process5", value: 10, optimal: "yes" },
    { source: "finishB", target: "process14", value: 5, optimal: "yes" },
  ],
};

//the big mockData to test relaxLeftAndRight
let data6 = {
  "nodes": [
      {
          "name": "label0",
          "col": 1
      },
      {
          "name": "label1",
          "col": 2
      },
      {
          "name": "label2",
          "col": 0
      },
      {
          "name": "label3",
          "col": 0
      },
      {
          "name": "label4",
          "col": 0
      },
      {
          "name": "label5",
          "col": 0
      },
      {
          "name": "label6",
          "col": 0
      },
      {
          "name": "label7",
          "col": 0
      },
      {
          "name": "label8",
          "col": 0
      },
      {
          "name": "label9",
          "col": 0
      },
      {
          "name": "label10",
          "col": 0
      },
      {
          "name": "label11",
          "col": 0
      },
      {
          "name": "label12",
          "col": 0
      },
      {
          "name": "label13",
          "col": 0
      },
      {
          "name": "label14",
          "col": 0
      },
      {
          "name": "label15",
          "col": 2
      },
      {
          "name": "label16",
          "col": 6
      },
      {
          "name": "label17",
          "col": 3
      },
      {
          "name": "label18",
          "col": 3
      },
      {
          "name": "label19",
          "col": 5
      },
      {
          "name": "label20",
          "col": 4
      },
      {
          "name": "label21",
          "col": 4
      },
      {
          "name": "label22",
          "col": 1
      },
      {
          "name": "label23",
          "col": 1
      },
      {
          "name": "label24",
          "col": 7
      },
      {
          "name": "label25",
          "col": 1
      },
      {
          "name": "label26",
          "col": 7
      },
      {
          "name": "label27",
          "col": 7
      },
      {
          "name": "label28",
          "col": 1
      },
      {
          "name": "label29",
          "col": 7
      },
      {
          "name": "label30",
          "col": 1
      },
      {
          "name": "label31",
          "col": 1
      },
      {
          "name": "label32",
          "col": 1
      },
      {
          "name": "label33",
          "col": 7
      },
      {
          "name": "label34",
          "col": 7
      },
      {
          "name": "label35",
          "col": 1
      },
      {
          "name": "label36",
          "col": 7
      },
      {
          "name": "label37",
          "col": 2
      },
      {
          "name": "label38",
          "col": 1
      },
      {
          "name": "label39",
          "col": 7
      },
      {
          "name": "label40",
          "col": 1
      },
      {
          "name": "label41",
          "col": 1
      },
      {
          "name": "label42",
          "col": 7
      },
      {
          "name": "label43",
          "col": 1
      },
      {
          "name": "label44",
          "col": 7
      },
      {
          "name": "label45",
          "col": 1
      },
      {
          "name": "label46",
          "col": 1
      },
      {
          "name": "label47",
          "col": 7
      },
      {
          "name": "label48",
          "col": 1
      },
      {
          "name": "label49",
          "col": 7
      },
      {
          "name": "label50",
          "col": 1
      },
      {
          "name": "label51",
          "col": 7
      },
      {
          "name": "label52",
          "col": 1
      },
      {
          "name": "label53",
          "col": 1
      },
      {
          "name": "label54",
          "col": 7
      },
      {
          "name": "label55",
          "col": 1
      },
      {
          "name": "label56",
          "col": 7
      },
      {
          "name": "label57",
          "col": 3
      },
      {
          "name": "label58",
          "col": 2
      },
      {
          "name": "label59",
          "col": 1
      },
      {
          "name": "label60",
          "col": 1
      },
      {
          "name": "label61",
          "col": 7
      },
      {
          "name": "label62",
          "col": 1
      },
      {
          "name": "label63",
          "col": 7
      },
      {
          "name": "label64",
          "col": 1
      },
      {
          "name": "label65",
          "col": 1
      },
      {
          "name": "label66",
          "col": 7
      },
      {
          "name": "label67",
          "col": 1
      },
      {
          "name": "label68",
          "col": 7
      },
      {
          "name": "label69",
          "col": 1
      },
      {
          "name": "label70",
          "col": 1
      },
      {
          "name": "label71",
          "col": 1
      },
      {
          "name": "label72",
          "col": 7
      },
      {
          "name": "label73",
          "col": 1
      },
      {
          "name": "label74",
          "col": 7
      }
  ],
  "links": [
      {
          "source": "label0",
          "target": "label1",
          "value": 13
      },
      {
          "source": "label2",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label3",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label4",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label5",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label6",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label7",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label8",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label9",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label10",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label11",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label12",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label13",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label14",
          "target": "label0",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label17",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label18",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label21",
          "value": 1
      },
      {
          "source": "label22",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label23",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label24",
          "value": 1
      },
      {
          "source": "label25",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label26",
          "value": 1
      },
      {
          "source": "label15",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label16",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label28",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label16",
          "target": "label29",
          "value": 1
      },
      {
          "source": "label30",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label31",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label32",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label16",
          "target": "label33",
          "value": 1
      },
      {
          "source": "label16",
          "target": "label34",
          "value": 1
      },
      {
          "source": "label35",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label16",
          "target": "label36",
          "value": 1
      },
      {
          "source": "label16",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label17",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label17",
          "target": "label37",
          "value": 1
      },
      {
          "source": "label28",
          "target": "label17",
          "value": 1
      },
      {
          "source": "label38",
          "target": "label17",
          "value": 1
      },
      {
          "source": "label17",
          "target": "label39",
          "value": 1
      },
      {
          "source": "label40",
          "target": "label17",
          "value": 1
      },
      {
          "source": "label41",
          "target": "label17",
          "value": 1
      },
      {
          "source": "label17",
          "target": "label42",
          "value": 1
      },
      {
          "source": "label43",
          "target": "label17",
          "value": 1
      },
      {
          "source": "label17",
          "target": "label44",
          "value": 1
      },
      {
          "source": "label17",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label18",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label38",
          "target": "label18",
          "value": 1
      },
      {
          "source": "label28",
          "target": "label18",
          "value": 1
      },
      {
          "source": "label45",
          "target": "label18",
          "value": 1
      },
      {
          "source": "label46",
          "target": "label18",
          "value": 1
      },
      {
          "source": "label18",
          "target": "label47",
          "value": 1
      },
      {
          "source": "label48",
          "target": "label18",
          "value": 1
      },
      {
          "source": "label18",
          "target": "label49",
          "value": 1
      },
      {
          "source": "label18",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label19",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label19",
          "target": "label16",
          "value": 1
      },
      {
          "source": "label38",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label28",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label50",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label19",
          "target": "label51",
          "value": 1
      },
      {
          "source": "label52",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label53",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label19",
          "target": "label54",
          "value": 1
      },
      {
          "source": "label55",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label19",
          "target": "label56",
          "value": 1
      },
      {
          "source": "label19",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label57",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label58",
          "value": 1
      },
      {
          "source": "label28",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label50",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label38",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label51",
          "value": 1
      },
      {
          "source": "label59",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label60",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label61",
          "value": 1
      },
      {
          "source": "label62",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label63",
          "value": 1
      },
      {
          "source": "label20",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label21",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label21",
          "target": "label19",
          "value": 1
      },
      {
          "source": "label28",
          "target": "label21",
          "value": 1
      },
      {
          "source": "label64",
          "target": "label21",
          "value": 1
      },
      {
          "source": "label65",
          "target": "label21",
          "value": 1
      },
      {
          "source": "label21",
          "target": "label66",
          "value": 1
      },
      {
          "source": "label67",
          "target": "label21",
          "value": 1
      },
      {
          "source": "label21",
          "target": "label68",
          "value": 1
      },
      {
          "source": "label21",
          "target": "label27",
          "value": 1
      },
      {
          "source": "label57",
          "target": "label15",
          "value": 1
      },
      {
          "source": "label57",
          "target": "label21",
          "value": 1
      },
      {
          "source": "label57",
          "target": "label20",
          "value": 1
      },
      {
          "source": "label69",
          "target": "label57",
          "value": 1
      },
      {
          "source": "label70",
          "target": "label57",
          "value": 1
      },
      {
          "source": "label71",
          "target": "label57",
          "value": 1
      },
      {
          "source": "label57",
          "target": "label72",
          "value": 1
      },
      {
          "source": "label73",
          "target": "label57",
          "value": 1
      },
      {
          "source": "label57",
          "target": "label74",
          "value": 1
      },
      {
          "source": "label57",
          "target": "label27",
          "value": 1
      }
  ]
}

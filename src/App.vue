<template>
  <div class="container">
    <h1>Code Editor</h1>
    <CodeEditor :problem="problem" />
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "./components/CodeEditor.vue";

const problem = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n" +
    "\n" +
    "You may assume that each input would have exactly one solution, and you may not use the same element twice.\n" +
    "\n" +
    "You can return the answer in any order.\n" +
    "\n" +
    "Example 1:\n" +
    "Input: nums = [2,7,11,15], target = 9\n" +
    "Output: [0,1]\n" +
    "Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n" +
    "\n" +
    "Example 2:\n" +
    "Input: nums = [3,2,4], target = 6\n" +
    "Output: [1,2]\n" +
    "\n" +
    "Example 3:\n" +
    "Input: nums = [3,3], target = 6\n" +
    "Output: [0,1]";
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 20px auto;
  padding-inline: 10px;
  color: #333;
}

h1 {
  text-align: center;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}
</style>
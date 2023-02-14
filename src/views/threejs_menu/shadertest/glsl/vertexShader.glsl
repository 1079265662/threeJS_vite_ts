// 设置精度
precision mediump float;

// 传入three.js中的一些变量
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float time;

// 传入three.js顶点关联的变量
attribute vec3 position;
// 传入three.js的uv内容
attribute vec2 uv;

// 创建公共变量
varying vec2 vUv;

void main() {
  vUv = uv;

  // 顶点坐标
  vec4 modelPostion = modelMatrix * vec4(position, 1.0);
  // modelPostion.z = sin((modelPostion.x + time) * 3.0) * 0.15;

  // 计算顶点位置
  gl_Position = projectionMatrix * viewMatrix * modelPostion;
}

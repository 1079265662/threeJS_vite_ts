// 设置精度
precision mediump float;

// 传入three.js中的一些变量
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float time;

// 传入three.js顶点关联的变量
attribute vec3 position;
attribute vec2 uv;

// 传递给片元着色器的变量
varying vec2 vUv;
varying float vPositionZ;

void main() {
  // 传递uv
  vUv = uv;

  vec4 modelPostion = modelMatrix * vec4(position, 1.0); // 顶点坐标

  modelPostion.z = sin((modelPostion.x + time) * 3.0) * 0.15; // 顶点坐标水平方向的z值(通过sin函数实现波浪效果-1~1) * 0.05(波浪的高度)
  // modelPostion.z += sin(modelPostion.y * 10.0) * 0.05; // 顶点坐标垂直方向的z值, 通过相加进行z轴的叠加

  vPositionZ = modelPostion.z; // 传递顶点坐标的z值

  gl_Position = projectionMatrix * viewMatrix * modelPostion; // 计算顶点位置
}

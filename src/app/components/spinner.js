export default function Spinner() {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      style={{ color: "currentColor" }}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect
        width="512"
        height="512"
        x="0"
        y="0"
        rx="30"
        fill="transparent"
        stroke="transparent"
        stroke-width="0"
        stroke-opacity="100%"
        paint-order="stroke"
      ></rect>
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 24 24"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        style={{ display: "inline-block", verticalAlign: "middle" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate
              id="svgSpinnersPulse30"
              fill="freeze"
              attributeName="r"
              begin="0;svgSpinnersPulse32.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="0;11"
            />
            <animate
              fill="freeze"
              attributeName="opacity"
              begin="0;svgSpinnersPulse32.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </circle>
          <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate
              id="svgSpinnersPulse31"
              fill="freeze"
              attributeName="r"
              begin="svgSpinnersPulse30.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="0;11"
            />
            <animate
              fill="freeze"
              attributeName="opacity"
              begin="svgSpinnersPulse30.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </circle>
          <circle cx="12" cy="12" r="0" fill="currentColor">
            <animate
              id="svgSpinnersPulse32"
              fill="freeze"
              attributeName="r"
              begin="svgSpinnersPulse30.begin+0.8s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="0;11"
            />
            <animate
              fill="freeze"
              attributeName="opacity"
              begin="svgSpinnersPulse30.begin+0.8s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </circle>
        </g>
      </svg>
    </svg>
  );
}

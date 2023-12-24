export default function CanvasTemplate({ width, height, canvasData }) {
  const script = `var I="${canvasData}",o=document.getElementById("logo"),e=o.getContext("2d");e==null&&(e=o.context2D);a(I,o,e);function a(l,v,h){let n=0,i=0,t=0;for(;t<l.length;){let c="";for(;l[t]!=="|"&&t<l.length;)c+=l[t++];t++;let g="";for(;l[t]!=="#"&&t<l.length;)g+=l[t++];t++;let f="";for(let d=0;d<8&&t<l.length;d++)f+=l[t++];let r=parseInt(c,10),w=parseInt(g,10);h.fillStyle="#"+f,h.fillRect(n,i,r,w),n+=r,n>=v.width&&(n=0,i+=w)}}`

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Image Gen By SkidMall - OMNI</title>
      </head>
      <body>
        <canvas width={width} height={height} id="logo"></canvas>
        <p>Made By SkidMall | OMNI</p>
        <script dangerouslySetInnerHTML={{ __html: script }}></script>
      </body>
    </html>
  )
}

function n(){let o=document.head.querySelector('link[rel="manifest"]');if(o)return o;let t=document.createElement("link");return t.rel="manifest",document.head.appendChild(t),t}function e(){window.matchMedia("(prefers-color-scheme: dark)").matches?(document.documentElement.classList.remove("light-theme"),n().setAttribute("href","manifest-dark.json")):(document.documentElement.classList.add("light-theme"),n().setAttribute("href","manifest-light.json"))}function a(){var t;let o=window.matchMedia("(prefers-color-scheme: dark)");e(),(t=o.addEventListener)==null||t.call(o,"change",e)}function f(){"serviceWorker"in navigator&&navigator.serviceWorker.register("./service-worker.js")}(function(){f(),a()})();

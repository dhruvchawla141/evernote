export default function Debounce(a, b, c) {
  // function to updata datbase in realtime after few seconds
  var d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

export function removeHTMLTags(str) {
  //do hide html tags from left panel
  return str.replace(/<[^>]*>?/gm, "");
}

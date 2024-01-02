function loco(){
    gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  
  }
  loco()
   
function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("a",{
        y:-30,
        opacity:-1,
        duration:1,
        delay:.1,
        ease:Power4,
        stagger:.1,
    })

    gsap.from("#anim1",{
        y:40,
        opacity:0,
        delay:.4,
        duration:1,
        stagger:.3,
    })

    Shery.textAnimate(".heading h1",{
        y:10,
        style:2,
        duration:1,
        delay:2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier:.28,
    })   
}
firstPageAnim();

gsap.to(".motive",{
    y:20,
    scale:1,
    scrollTrigger:{
        trigger:".motive",
        scroller:"#main",
        // markers:true,
        start: "top 60%",
        end: "top 20%",
        scrub:2,
    }
})

gsap.from(".synergy, .harmony",{
  y:200,
  duration:2,
  opacity:.2,
  scrollTrigger:{
      trigger:".synergy,.harmony",
      scroller:"#main",
      markers:true,
      start: "top 60%",
      end: "top 40%",
      scrub: 2,
  }
})


document.querySelector(".think button")
.addEventListener("mouseover",function(){
  gsap.to(".think>video",{
    opacity:1,
    duration:.5,
  })
})

document.querySelector(".think button")
.addEventListener("mouseleave",function(){
  gsap.to(".think>video",{
    opacity:0,
    duration:.5,
  })
})
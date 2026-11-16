/**
 * Orchestrated Main Interactive Application
 */

// Comprehensive case study data matching original site
const CASE_STUDIES = {
  vast: {
    client: "Vast × Antinomy Studio",
    title: "Vast Motion Toolkit",
    description: "Vast wanted a motion system that creatives anywhere in the world could use to make motion that fits the brand. We built it around gravity: its physics shape the easing and the flow. At its core are the animation anchors, the words that define how things move. They are the fingerprint that makes the motion unmistakably Vast.",
    media: [
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/vast/01titlecardleftalignlargeeyebrow16x9smal-mv584zot.mp4",
        caption: "Title card: “Launch Day, August 23rd, 2025, Cape Canaveral, FL” over an astronaut floating through a space-station corridor"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/vast/02lowerthirds4x5small-mv5867p3.mp4",
        caption: "Docking motion principle applied in the lower third"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/vast/03endcardmoonrockonvaporgray16x9small-mv586vrl.mp4",
        caption: "Vast logo end card on a light grey background"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/vast/04transitiontitleslide16x9small-mv58i6mp.mp4",
        caption: "Transition shot: a Vast space station orbiting above the clouds transitioning to a title card that says Launch Day Haven-1"
      }
    ]
  },
  extra: {
    client: "Extra.Email",
    title: "Extra.Email — Onboarding video",
    description: "Extra.Email needed a clear, dynamic explainer of its triage principles. We translated high-velocity email triage into tactile, floating card interactions and rhythmic motion beats.",
    media: [
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/featured/extraexplainer01v0031x1-mvaztkix.rmvazu8fl.mp4",
        caption: "Extra.Email onboarding: tilted email cards labelled Needs action, Daily cleanup and Good to know"
      }
    ]
  },
  persepolis: {
    client: "Getty × Monks",
    title: "Persepolis Reimagined",
    description: "Alexander the Great burned Persepolis in 330 BC and with it went one of the most impressive cities the ancient world had seen. The Getty Villa brought it back in an exhibition on ancient Persia. We took it further with a WebGL experience that lets anyone walk through the city as it once stood.",
    media: [
      {
        type: "image",
        src: "assets/images/cases/persepolis/01persepolis-1medium-mv59sgz3.webp",
        caption: "Persepolis Reimagined landing page: the title over a golden field at sunset, with an Enter button"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/persepolis/02persepolistumbeditfull-mv6s6xal.mp4",
        caption: "“Gate of All Nations” chapter: the reconstructed gateway with its guardian statues"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/persepolis/04unityworkflow01-mv59td5w.mp4",
        caption: "WebGL scene and camera path set up in Unity, exported to a custom WebGL framework"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/persepolis/05award-mv6sgz14.mp4",
        caption: "Celebrating Awwwards Site of the Year"
      }
    ]
  },
  coach: {
    client: "Coach × Monks",
    title: "The Pleasure Pursuit",
    description: "Coach’s new collection was inspired by Tom Wesselmann, so we brought his work to life in WebGL. A playful way to explore the artist’s story and the pieces he inspired. And oranges, of course.",
    media: [
      {
        type: "image",
        src: "assets/images/cases/new-case/coach01-mvwhd2e1.webp",
        caption: "The Pleasure Pursuit landing page"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/new-case/coachcase01-mvwhdack.mp4",
        caption: "Interactive chapter navigation"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/new-case/coachcase02-mvwhh57w.mp4",
        caption: "Interactive chapter: 3D scene with orange peel shader"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/new-case/coachcase04-mvgp0x62.mp4",
        caption: "All scenes are set up in Unity and exported to WebGL"
      }
    ]
  },
  mugler: {
    client: "Mugler × Monks",
    title: "We are all Angel",
    description: "Mugler dropped 300 unique NFTs by Marc Tudisco. We built a site that asked a few simple questions, giving you a feel for the world along the way and matching you with the Angel that suits you best. The result? All 300 sold out in seconds.",
    media: [
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/mugler/muglerclip01small-mv59uhs1.mp4",
        caption: "Interactive quiz step animation"
      },
      {
        type: "image",
        src: "assets/images/cases/mugler/muglermobile01-mv5aen6x.webp",
        caption: "Mobile experience and celestial avatar display"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/mugler/muglerclip02small-mv59uygw.mp4",
        caption: "Match reveal animation sequence"
      }
    ]
  },
  bitkraft: {
    client: "BITKRAFT × Monks",
    title: "BITKRAFT Website",
    description: "BITKRAFT invests in games and wanted a site nothing like other investors’. It flips between white (the investment side) and dark with WebGL cubes (the worlds they invest in), with gamey UX: a circular menu, WASD controls and blinky, staggered motion.",
    media: [
      {
        type: "image",
        src: "assets/images/cases/bitkraft/caseslide01-mvgp4ouz.webp",
        caption: "BITKRAFT gaming investor experience overview"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/bitkraft/clip01portfolio-mv5b14kd.mp4",
        caption: "Dynamic 3D cube interactive portfolio navigation"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/bitkraft/clip02people-mv5b14o1.mp4",
        caption: "Team roster and staggered motion transitions"
      }
    ]
  },
  greta: {
    client: "Superhero Cheesecake",
    title: "Year of Greta",
    description: "An unused pitch design, a bit of downtime and Greta Thunberg being named Person of the Year came together in this side project: one simple interaction to scroll through the year that brought her there.",
    media: [
      {
        type: "image",
        src: "assets/images/cases/year-of-greta/gretalandingmedium-mv5aj7hg.webp",
        caption: "Landing view of Year of Greta interactive timeline"
      },
      {
        type: "image",
        src: "assets/images/cases/year-of-greta/gretaintromedium-mv5aiudf.webp",
        caption: "Intro sequence and portrait typography"
      },
      {
        type: "video",
        src: "https://orchestrated.nl/assets/images/cases/year-of-greta/gretaclip1-mv5ajbo2.mp4",
        caption: "Interactive scroll scrubber through 365 days"
      }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const soundToggle = document.getElementById('sound-toggle');
  const studioTrigger = document.getElementById('studio-trigger');
  const creditsTrigger = document.getElementById('credits-trigger');
  const playReelBtn = document.getElementById('play-reel-btn');

  // Modals
  const reelModal = document.getElementById('reel-modal');
  const creditsModal = document.getElementById('credits-modal');
  const studioModal = document.getElementById('studio-modal');
  const caseModal = document.getElementById('case-modal');
  const allModals = [reelModal, creditsModal, studioModal, caseModal];

  // Video elements inside reel
  const reelVideo = document.getElementById('reel-video');
  const playPauseBtn = document.getElementById('video-play-pause');
  const scrubber = document.getElementById('video-scrubber');
  const timeDisplay = document.getElementById('video-time');

  // Toast
  const toast = document.getElementById('toast-notice');

  function showToast(msg = 'Email copied to clipboard') {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (window.soundEngine) window.soundEngine.playClick();
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function copyToClipboard(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
      }).catch(() => {
        fallbackCopy(text, msg);
      });
    } else {
      fallbackCopy(text, msg);
    }
  }

  function fallbackCopy(text, msg) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(msg);
  }

  // Open Modal Helper
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.soundEngine) window.soundEngine.playModalOpen();
  }

  // Close Modal Helper
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.soundEngine) window.soundEngine.playModalClose();

    // Pause video if reel modal was closed
    if (modal === reelModal && reelVideo) {
      reelVideo.pause();
    }
  }

  // Close button handlers
  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Background overlay click to close
  allModals.forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach((m) => closeModal(m));
    }
  });

  // Sound Toggle Click
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.toggleMute();
    });
  }

  // Sound Studio Click
  if (studioTrigger) {
    studioTrigger.addEventListener('click', () => {
      openModal(studioModal);
    });
  }

  // Credits Click
  if (creditsTrigger) {
    creditsTrigger.addEventListener('click', () => {
      openModal(creditsModal);
    });
  }

  // Play Reel Click
  if (playReelBtn) {
    playReelBtn.addEventListener('click', () => {
      openModal(reelModal);
      if (reelVideo) {
        reelVideo.play().catch(() => {});
      }
    });
  }

  // Showreel Video Custom Controls
  if (reelVideo && scrubber) {
    reelVideo.addEventListener('timeupdate', () => {
      if (reelVideo.duration) {
        scrubber.value = (reelVideo.currentTime / reelVideo.duration) * 100;
        const curMins = Math.floor(reelVideo.currentTime / 60);
        const curSecs = Math.floor(reelVideo.currentTime % 60).toString().padStart(2, '0');
        const durMins = Math.floor(reelVideo.duration / 60);
        const durSecs = Math.floor(reelVideo.duration % 60).toString().padStart(2, '0');
        if (timeDisplay) {
          timeDisplay.textContent = `${curMins}:${curSecs} / ${durMins}:${durSecs}`;
        }
      }
    });

    scrubber.addEventListener('input', () => {
      if (reelVideo.duration) {
        reelVideo.currentTime = (scrubber.value / 100) * reelVideo.duration;
      }
    });

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (reelVideo.paused) {
          reelVideo.play();
          playPauseBtn.textContent = 'PAUSE';
        } else {
          reelVideo.pause();
          playPauseBtn.textContent = 'PLAY';
        }
      });
    }
  }

  // Case Study Cards Click -> Open Case Modal
  document.querySelectorAll('.case-card').forEach((card) => {
    card.addEventListener('click', () => {
      const caseKey = card.getAttribute('data-case');
      const data = CASE_STUDIES[caseKey];
      if (!data) return;

      const headerEl = document.getElementById('case-modal-content');
      if (headerEl) {
        let mediaHtml = '';
        data.media.forEach((item) => {
          if (item.type === 'video') {
            mediaHtml += `
              <div class="case-modal-media-item">
                <video src="${item.src}" autoplay loop muted playsinline controls></video>
                <div class="case-modal-caption">${item.caption}</div>
              </div>
            `;
          } else {
            mediaHtml += `
              <div class="case-modal-media-item">
                <img src="${item.src}" alt="${data.title}">
                <div class="case-modal-caption">${item.caption}</div>
              </div>
            `;
          }
        });

        headerEl.innerHTML = `
          <div class="case-modal-header">
            <div class="case-modal-client">${data.client}</div>
            <h2 class="case-modal-title">${data.title}</h2>
            <p class="case-modal-desc">${data.description}</p>
          </div>
          <div class="case-modal-media-list">
            ${mediaHtml}
          </div>
        `;
      }

      openModal(caseModal);
    });
  });

  // Copy Email Handlers
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard('info@orchestrated.nl', 'info@orchestrated.nl copied to clipboard');
    });
  });

  // Freelance pill click
  const freelancePill = document.getElementById('freelance-pill');
  const freelanceText = document.getElementById('freelance-text');
  if (freelancePill) {
    freelancePill.addEventListener('click', () => {
      copyToClipboard('info@orchestrated.nl', 'info@orchestrated.nl copied to clipboard');
      if (freelanceText) {
        const originalText = freelanceText.textContent;
        freelanceText.textContent = 'Email address copied!';
        setTimeout(() => {
          freelanceText.textContent = originalText;
        }, 2500);
      }
    });
  }

  // Audio UI effects on hover for buttons & cards
  const interactiveElements = document.querySelectorAll('.glass-pill, .case-card, .capability-tag, .footer-email-link');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (window.soundEngine) window.soundEngine.playHover();
    });
  });

  // Sound Studio Track Toggles
  document.querySelectorAll('.track-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const track = btn.getAttribute('data-track');
      btn.classList.toggle('active');
      if (window.soundEngine && window.soundEngine.tracks[track]) {
        window.soundEngine.tracks[track].active = btn.classList.contains('active');
        if (window.soundEngine.tracks[track].gain && window.soundEngine.ctx) {
          const val = window.soundEngine.tracks[track].active ? 0.5 : 0;
          window.soundEngine.tracks[track].gain.gain.setValueAtTime(val, window.soundEngine.ctx.currentTime);
        }
      }
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
});

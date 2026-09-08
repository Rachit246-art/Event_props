/**
 * Interactive Stage FX Visualizer Simulation
 * Renders Cold Pyro Sparks, Low Fog Clouds, Confetti Cascades, CO2 Plumes & Laser Beams on an HTML5 Canvas.
 */

class StageFXVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.activeEffects = {
      pyro: true,
      lowFog: true,
      confetti: false,
      co2: false,
      lasers: true
    };

    this.particles = [];
    this.confettiParticles = [];
    this.fogParticles = [];
    this.co2Particles = [];
    this.laserAngle = 0;
    this.animationFrameId = null;

    this.initCanvasSize();
    this.initEventListeners();
    this.startLoop();
  }

  initCanvasSize() {
    const updateSize = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * window.devicePixelRatio || 900;
      this.canvas.height = rect.height * window.devicePixelRatio || 480;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateSize();
    window.addEventListener('resize', () => {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      updateSize();
    });
  }

  initEventListeners() {
    const toggles = document.querySelectorAll('[data-fx-toggle]');
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const fxType = btn.getAttribute('data-fx-toggle');
        this.toggleEffect(fxType, btn);
      });
    });

    const triggerBurstBtn = document.getElementById('trigger-all-fx-btn');
    if (triggerBurstBtn) {
      triggerBurstBtn.addEventListener('click', () => {
        this.triggerGrandClimax();
      });
    }
  }

  toggleEffect(fxType, btnElement) {
    if (this.activeEffects[fxType] !== undefined) {
      this.activeEffects[fxType] = !this.activeEffects[fxType];
      if (btnElement) {
        if (this.activeEffects[fxType]) {
          btnElement.classList.add('active');
        } else {
          btnElement.classList.remove('active');
        }
      }

      // If triggering CO2 or Confetti, burst a volley immediately
      if (this.activeEffects[fxType] && fxType === 'confetti') {
        this.spawnConfettiBurst();
      }
      if (this.activeEffects[fxType] && fxType === 'co2') {
        this.spawnCO2Plume();
      }
    }
  }

  triggerGrandClimax() {
    Object.keys(this.activeEffects).forEach(key => {
      this.activeEffects[key] = true;
      const btn = document.querySelector(`[data-fx-toggle="${key}"]`);
      if (btn) btn.classList.add('active');
    });

    this.spawnConfettiBurst(200);
    this.spawnCO2Plume();
  }

  spawnPyroParticles(x, groundY) {
    const count = 7;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 1.5) + (Math.random() - 0.5) * 0.45;
      const speed = 7 + Math.random() * 8;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: groundY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2.5,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        colorType: Math.random() > 0.2 ? 'gold' : 'silver',
        gravity: 0.18
      });
    }
  }

  spawnFogParticles(groundY, width) {
    if (this.fogParticles.length > 120) return;
    for (let i = 0; i < 3; i++) {
      this.fogParticles.push({
        x: Math.random() * width,
        y: groundY - 10 - Math.random() * 30,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.05 + Math.random() * 0.1,
        radius: 35 + Math.random() * 45,
        alpha: 0.01,
        maxAlpha: 0.22 + Math.random() * 0.15,
        fadeState: 'in',
        life: 0,
        maxLife: 180 + Math.random() * 120
      });
    }
  }

  spawnConfettiBurst(amount = 120) {
    const rect = this.canvas.getBoundingClientRect();
    const colors = ['#F59E0B', '#EF4444', '#EC4899', '#3B82F6', '#10B981', '#FFFFFF', '#FCD34D'];
    
    for (let i = 0; i < amount; i++) {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? rect.width * 0.15 : rect.width * 0.85;
      const angle = fromLeft ? -Math.PI * 0.35 + (Math.random() - 0.5) * 0.5 : -Math.PI * 0.65 + (Math.random() - 0.5) * 0.5;
      const speed = 10 + Math.random() * 12;

      this.confettiParticles.push({
        x: startX,
        y: rect.height * 0.8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        sizeW: 8 + Math.random() * 6,
        sizeH: 5 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.12,
        drag: 0.985,
        alpha: 1
      });
    }
  }

  spawnCO2Plume() {
    const rect = this.canvas.getBoundingClientRect();
    const positions = [rect.width * 0.3, rect.width * 0.7];
    
    positions.forEach(pos => {
      for (let i = 0; i < 40; i++) {
        const spreadAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
        const blastSpeed = 12 + Math.random() * 10;
        this.co2Particles.push({
          x: pos + (Math.random() - 0.5) * 16,
          y: rect.height * 0.82,
          vx: Math.cos(spreadAngle) * blastSpeed,
          vy: Math.sin(spreadAngle) * blastSpeed,
          radius: 12 + Math.random() * 10,
          growth: 1.5 + Math.random() * 1.5,
          alpha: 0.65,
          decay: 0.03 + Math.random() * 0.02
        });
      }
    });
  }

  render() {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Atmospheric Stage Lighting Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0B0F19');
    bgGrad.addColorStop(0.6, '#111827');
    bgGrad.addColorStop(1, '#080C14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Ambient Overhead Spotlight Cones
    const spotX1 = width * 0.3;
    const spotX2 = width * 0.7;

    const drawSpotlight = (x, color, spread) => {
      const spotGrad = ctx.createRadialGradient(x, 0, 5, x, height * 0.8, spread);
      spotGrad.addColorStop(0, color);
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.moveTo(x - 15, 0);
      ctx.lineTo(x + 15, 0);
      ctx.lineTo(x + spread, height * 0.82);
      ctx.lineTo(x - spread, height * 0.82);
      ctx.closePath();
      ctx.fill();
    };

    drawSpotlight(spotX1, 'rgba(245, 158, 11, 0.12)', width * 0.28);
    drawSpotlight(spotX2, 'rgba(236, 72, 153, 0.12)', width * 0.28);
    drawSpotlight(width * 0.5, 'rgba(6, 182, 212, 0.10)', width * 0.35);

    // 2. Animated Lasers
    if (this.activeEffects.lasers) {
      this.laserAngle += 0.025;
      const laserSources = [
        { x: width * 0.2, color: 'rgba(239, 68, 68, 0.75)' },
        { x: width * 0.5, color: 'rgba(6, 182, 212, 0.75)' },
        { x: width * 0.8, color: 'rgba(168, 85, 247, 0.75)' }
      ];

      laserSources.forEach((src, idx) => {
        for (let b = -2; b <= 2; b++) {
          const sweep = Math.sin(this.laserAngle + idx * 1.5) * 0.6 + (b * 0.22);
          const endX = src.x + Math.sin(sweep) * width * 0.65;
          const endY = height * 0.85 + Math.cos(sweep) * 40;

          ctx.save();
          ctx.strokeStyle = src.color;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = src.color;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.moveTo(src.x, 20);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();
        }
      });
    }

    // 3. Stage Platform Graphic
    const stageY = height * 0.82;
    const stageGrad = ctx.createLinearGradient(0, stageY, 0, height);
    stageGrad.addColorStop(0, '#1E293B');
    stageGrad.addColorStop(0.1, '#0F172A');
    stageGrad.addColorStop(1, '#05070B');

    ctx.fillStyle = stageGrad;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, stageY);
    ctx.lineTo(width * 0.92, stageY);
    ctx.lineTo(width * 0.98, height);
    ctx.lineTo(width * 0.02, height);
    ctx.closePath();
    ctx.fill();

    // Stage Edge Glow line
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, stageY);
    ctx.lineTo(width * 0.92, stageY);
    ctx.stroke();

    // Stage FX Machine Pods (Visual props)
    const machinePositions = [
      width * 0.22,
      width * 0.38,
      width * 0.62,
      width * 0.78
    ];

    machinePositions.forEach(x => {
      ctx.fillStyle = '#334155';
      ctx.fillRect(x - 12, stageY - 14, 24, 14);
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(x - 6, stageY - 16, 12, 3);
    });

    // 4. Low Fog Cloud Simulation (Heavy smoke on the floor)
    if (this.activeEffects.lowFog) {
      this.spawnFogParticles(stageY, width);
    }

    for (let i = this.fogParticles.length - 1; i >= 0; i--) {
      const fog = this.fogParticles[i];
      fog.x += fog.vx;
      fog.y += fog.vy;
      fog.life++;

      if (fog.fadeState === 'in') {
        fog.alpha += 0.008;
        if (fog.alpha >= fog.maxAlpha) fog.fadeState = 'out';
      } else {
        fog.alpha -= 0.003;
      }

      if (fog.alpha <= 0 || fog.life >= fog.maxLife) {
        this.fogParticles.splice(i, 1);
        continue;
      }

      const grad = ctx.createRadialGradient(fog.x, fog.y, 5, fog.x, fog.y, fog.radius);
      grad.addColorStop(0, `rgba(230, 240, 255, ${fog.alpha})`);
      grad.addColorStop(0.6, `rgba(200, 220, 250, ${fog.alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(200, 220, 250, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(fog.x, fog.y, fog.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Cold Pyro Sparkular Fountain Simulation
    if (this.activeEffects.pyro) {
      machinePositions.forEach(x => {
        this.spawnPyroParticles(x, stageY - 14);
      });
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > stageY + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.shadowBlur = 10;
      if (p.colorType === 'gold') {
        ctx.fillStyle = `rgba(255, 205, 86, ${p.alpha})`;
        ctx.shadowColor = '#F59E0B';
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowColor = '#FFFFFF';
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Spark Tail
      ctx.strokeStyle = `rgba(245, 158, 11, ${p.alpha * 0.5})`;
      ctx.lineWidth = p.size * 0.8;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
      ctx.stroke();

      ctx.restore();
    }

    // 6. CO2 Plumes
    for (let i = this.co2Particles.length - 1; i >= 0; i--) {
      const c = this.co2Particles[i];
      c.x += c.vx;
      c.y += c.vy;
      c.radius += c.growth;
      c.alpha -= c.decay;

      if (c.alpha <= 0) {
        this.co2Particles.splice(i, 1);
        continue;
      }

      const grad = ctx.createRadialGradient(c.x, c.y, 2, c.x, c.y, c.radius);
      grad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha})`);
      grad.addColorStop(0.5, `rgba(200, 240, 255, ${c.alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. Confetti Particles Flutter
    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const cf = this.confettiParticles[i];
      cf.x += cf.vx;
      cf.y += cf.vy;
      cf.vx *= cf.drag;
      cf.vy += cf.gravity;
      cf.rot += cf.vRot;

      if (cf.y > height + 20) {
        this.confettiParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(cf.x, cf.y);
      ctx.rotate(cf.rot);
      ctx.fillStyle = cf.color;
      ctx.shadowColor = cf.color;
      ctx.shadowBlur = 4;
      ctx.fillRect(-cf.sizeW / 2, -cf.sizeH / 2, cf.sizeW, cf.sizeH);
      ctx.restore();
    }
  }

  startLoop() {
    const loop = () => {
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.stageFX = new StageFXVisualizer('stage-fx-canvas');
});

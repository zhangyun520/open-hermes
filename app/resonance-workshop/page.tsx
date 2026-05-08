'use client';

import { useState } from 'react';
import { JellyVisual } from '@/components/JellyVisual';
import { Card, Metric, PageTitle } from '@/components/UI';
import { applyJellyAppearance, saveCustomizationPreset, validateCosmeticSubmission } from '@/lib/workshop';
import { resonanceWorkshopState, starterAppearance, userProgress } from '@/lib/productSystemsMock';
import type { CustomizationPreset, JellyAppearance } from '@/lib/types';

const suites = ['深海学者', '冷潮审校者', '星海连接者', '珊瑚工程师', '梦潮创作者'];

export default function ResonanceWorkshopPage() {
  const [appearance, setAppearance] = useState<JellyAppearance>(resonanceWorkshopState.activeAppearance);
  const [presets, setPresets] = useState<CustomizationPreset[]>(resonanceWorkshopState.presets);
  const [review, setReview] = useState<ReturnType<typeof validateCosmeticSubmission> | null>(null);

  return (
    <div>
      <PageTitle eyebrow="Resonance Workshop" title="共鸣工坊">
        安静的创作空间：基础 DIY 低门槛开放，免费用户也能拥有好看的水母、空间、身份展示和界面装饰。外观不影响审核权重、贡献权重或技能能力。
      </PageTitle>

      <section className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <JellyVisual compact activity={appearance.glowIntensity} cache={appearance.particleSpeed} residual={appearance.tentacleSwing} />
          <div className="grid grid-cols-2 gap-3">
            <Metric label="DIY 解锁" value={resonanceWorkshopState.diyUnlocked ? '已解锁' : '未解锁'} />
            <Metric label="存档位" value={`${presets.length}/${resonanceWorkshopState.maxPresetSlots}`} />
            <Metric label="贡献权重" value={userProgress.contributionWeight} />
            <Metric label="审核权重" value={userProgress.reviewWeight} />
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">一键套装</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {suites.map((suite, index) => (
              <button
                key={suite}
                onClick={() => setAppearance({ ...starterAppearance, name: suite, mainColor: resonanceWorkshopState.colorOptions[index] ?? starterAppearance.mainColor })}
                className="rounded-2xl border border-tide/20 bg-tide/10 p-4 text-left hover:bg-tide/20"
              >
                <b>{suite}</b>
                <p className="mt-2 text-sm text-white/60">可继续微调颜色、触手、光效和背景。</p>
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold">模板微调</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="text-sm text-white/65">主色<select value={appearance.mainColor} onChange={(event) => setAppearance({ ...appearance, mainColor: event.target.value })} className="mt-2 w-full rounded-xl bg-[#071a35] p-3">{resonanceWorkshopState.colorOptions.map((color) => <option key={color}>{color}</option>)}</select></label>
            <label className="text-sm text-white/65">伞盖<select value={appearance.bellShape} onChange={(event) => setAppearance({ ...appearance, bellShape: event.target.value })} className="mt-2 w-full rounded-xl bg-[#071a35] p-3">{resonanceWorkshopState.bellOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="text-sm text-white/65">触手<select value={appearance.tentacleStyle} onChange={(event) => setAppearance({ ...appearance, tentacleStyle: event.target.value })} className="mt-2 w-full rounded-xl bg-[#071a35] p-3">{resonanceWorkshopState.tentacleOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="text-sm text-white/65">光效<select value={appearance.glowEffect} onChange={(event) => setAppearance({ ...appearance, glowEffect: event.target.value })} className="mt-2 w-full rounded-xl bg-[#071a35] p-3">{resonanceWorkshopState.glowOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <button onClick={() => applyJellyAppearance({ activeAppearance: appearance }, appearance)} className="mt-5 rounded-2xl bg-tide/20 px-5 py-3 text-tide">应用外观</button>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">深度 DIY / 保存方案</h3>
          <button
            onClick={() => {
              const preset: CustomizationPreset = { presetId: `preset-${Date.now()}`, name: appearance.name, mode: 'deep_diy', appearance, visibility: 'private', reviewStatus: 'approved' };
              setPresets((current) => saveCustomizationPreset({ presets: current }, preset).presets ?? current);
            }}
            className="rounded-2xl bg-plankton/20 px-5 py-3 text-plankton"
          >保存当前方案</button>
          <div className="mt-4 space-y-3">{presets.map((preset) => <div key={preset.presetId} className="rounded-2xl bg-white/5 p-4"><b>{preset.name}</b><p className="text-sm text-white/60">{preset.mode} · {preset.reviewStatus}</p></div>)}</div>
          <button onClick={() => setReview(validateCosmeticSubmission({ name: '原创纸页流光', description: '教育系学塔、纸页流光、星图纹理', usesReference: true }))} className="mt-5 rounded-2xl border border-white/15 px-5 py-3 text-white/75">提交模板审核 mock</button>
          {review ? <p className="mt-3 text-sm text-coral">审核状态：{review.status} · {review.reasons.join(' / ') || '通过'}</p> : null}
        </Card>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, Metric, PageTitle } from '@/components/UI';
import { applyAvatarMorph, generateAvatarStyleTags, validateAvatarMorphRequest } from '@/lib/morphing';
import { avatarForms, avatarStyles, avatarTemplates, userAvatarState } from '@/lib/productSystemsMock';

export default function AvatarMorphingPage() {
  const [avatar, setAvatar] = useState(userAvatarState);
  const [prompt, setPrompt] = useState('原创深海学者，纸页流光，温和蓝色轮廓');
  const [validation, setValidation] = useState<ReturnType<typeof validateAvatarMorphRequest> | null>(null);

  return (
    <div>
      <PageTitle eyebrow="Avatar Morphing" title="幻化工坊">
        你可以保留默认水母形态，也可以将认知化身幻化成更符合审美的原创样子。幻化只改变外观表达，不改变能力结构与贡献记录。
      </PageTitle>

      <section className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <div className="rounded-[2rem] border border-tide/20 bg-[radial-gradient(circle,rgba(131,247,255,.28),transparent_58%)] p-8 text-center">
            <div className="mx-auto grid h-44 w-44 place-items-center rounded-full border border-tide/30 bg-tide/10 text-7xl shadow-glow">🪼</div>
            <h2 className="mt-5 text-3xl font-semibold">内核是 {avatar.coreFormId}，外显是 {avatar.morphFormId}</h2>
            <p className="mt-3 text-sm text-white/62">{avatar.boundaryNote}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Metric label="已解锁形态" value={avatar.unlockedFormIds.length} />
            <Metric label="核心槽" value="公平不变" />
            <Metric label="展示槽" value="可幻化" />
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">官方形态系</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {avatarForms.map((form) => (
              <button key={form.formId} onClick={() => setAvatar(applyAvatarMorph(avatar, { formId: form.formId, styleTags: avatar.styleTags }))} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:border-tide/40">
                <b>{form.name}</b>
                <p className="mt-1 text-sm text-white/60">{form.description}</p>
                <p className="mt-2 text-xs text-tide">{avatar.unlockedFormIds.includes(form.formId) ? '已解锁' : '成长解锁'}</p>
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold">风格幻化系</h3>
          <div className="mt-4 flex flex-wrap gap-2">{avatarStyles.flatMap((style) => style.tags).map((tag) => <span key={tag} className="rounded-full border border-tide/20 bg-tide/10 px-3 py-1 text-sm text-tide">{tag}</span>)}</div>
          <button onClick={() => setAvatar({ ...avatar, styleTags: generateAvatarStyleTags(['学习', '工程', '深海']) })} className="mt-5 rounded-2xl bg-tide/20 px-5 py-3 text-tide">生成风格标签</button>
          <p className="mt-3 text-sm text-plankton">当前：{avatar.styleTags.join(' / ')}</p>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold">边界规则校验</h3>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} className="mt-4 min-h-28 w-full rounded-2xl bg-white/10 p-4" />
          <button onClick={() => setValidation(validateAvatarMorphRequest({ prompt, referenceMode: false }))} className="mt-4 rounded-2xl bg-coral/20 px-5 py-3 text-coral">校验幻化请求</button>
          {validation ? <p className="mt-3 text-sm text-white/70">状态：{validation.status} · {validation.reasons.join(' / ')}</p> : null}
        </Card>
      </section>

      <Card className="mt-6">
        <h3 className="text-2xl font-semibold">认知职业幻化分类</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-4">{avatarTemplates.map((template) => <div key={template.templateId} className="rounded-2xl bg-white/5 p-4"><b>{template.name}</b><p className="mt-1 text-sm text-tide">{template.careerClass}</p><p className="mt-2 text-sm text-white/60">{template.description}</p></div>)}</div>
      </Card>
    </div>
  );
}

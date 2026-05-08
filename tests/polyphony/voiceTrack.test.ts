import { describe, expect, it } from 'vitest';
import { forkVersion, generateVersionLineage, getVersionNode } from '../../src/polyphony';
import { setupBasicPolyphony } from './helpers';
describe('polyphony fork and lineage', () => {
  it('can fork a VersionNode to another VoiceTrack', () => { const { base, experimental } = setupBasicPolyphony(); const fork = forkVersion(base.id, experimental.id, 'try bold UI'); expect(fork.parentVersionIds).toEqual([base.id]); expect(getVersionNode(base.id)?.childVersionIds).toContain(fork.id); });
  it('version lineage is correct', () => { const { base, experimental } = setupBasicPolyphony(); const fork = forkVersion(base.id, experimental.id, 'experiment'); const lineage = generateVersionLineage(fork.id); expect(lineage.parents.map((node) => node.id)).toEqual([base.id]); expect(lineage.ancestors.map((node) => node.id)).toEqual([base.id]); });
});

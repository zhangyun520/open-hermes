import { describe, expect, it } from 'vitest';
import { createVersionFamily, createVoiceTrack, getActivePolyphony } from '../../src/polyphony';
import { resetPolyphony } from './helpers';
describe('polyphony version families and tracks', () => {
  it('can create VersionFamily', () => { resetPolyphony(); const family = createVersionFamily('whitepaper', 'wp', 'Whitepaper'); expect(family.id).toContain('vf-'); expect(family.versionNodeIds).toEqual([]); });
  it('can create multiple VoiceTrack records', () => { resetPolyphony(); const family = createVersionFamily('whitepaper', 'wp', 'Whitepaper'); createVoiceTrack(family.id, 'stable', 'Stable', 'safe'); createVoiceTrack(family.id, 'experimental', 'Experimental', 'bold'); expect(getActivePolyphony(family.id).voiceTracks.map((track) => track.type)).toEqual(['stable', 'experimental']); });
});

import * as Phaser from 'phaser';

export interface iText extends Phaser.GameObjects.Text {}

export interface iArcadeGroup extends Phaser.Physics.Arcade.Group {}

export interface iGameConfig extends Phaser.Types.Core.GameConfig {}

export interface iCursors extends Phaser.Types.Input.Keyboard.CursorKeys {}

export interface iArcadeStaticGroup extends Phaser.Physics.Arcade.StaticGroup {}

export interface iGroup extends Phaser.Types.GameObjects.Group.GroupCreateConfig {}

export interface iPlayer extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {}

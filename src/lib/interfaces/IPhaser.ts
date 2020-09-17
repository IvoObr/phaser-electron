import * as Phaser from 'phaser';

export interface IText extends Phaser.GameObjects.Text {}

export interface IArcadeGroup extends Phaser.Physics.Arcade.Group {}

export interface IGameConfig extends Phaser.Types.Core.GameConfig {}

export interface ICursors extends Phaser.Types.Input.Keyboard.CursorKeys {}

export interface IArcadeStaticGroup extends Phaser.Physics.Arcade.StaticGroup {}

export interface IGroup extends Phaser.Types.GameObjects.Group.GroupCreateConfig {}

export interface IPlayer extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {}

import Phaser from 'phaser';

export interface IPlayer extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {}

export interface IArcadeStaticGroup extends Phaser.Physics.Arcade.StaticGroup {}

export interface ICursors extends Phaser.Types.Input.Keyboard.CursorKeys {}

export interface IArcadeGroup extends Phaser.Physics.Arcade.Group {}

export interface IText extends Phaser.GameObjects.Text {}

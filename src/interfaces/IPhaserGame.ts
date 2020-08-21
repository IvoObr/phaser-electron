import Phaser from 'phaser';

export interface IPlayer extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {}
export interface IPhysics extends Phaser.Physics.Arcade.ArcadePhysics {}
export interface IAnims extends Phaser.Animations.AnimationManager {}
export interface IArcadeStaticGroup extends Phaser.Physics.Arcade.StaticGroup {}
export interface IArcadeGroup extends Phaser.Physics.Arcade.Group {}
export interface ICursors extends Phaser.Types.Input.Keyboard.CursorKeys {}
export interface IText extends Phaser.GameObjects.Text {}

export const ASCII_TEXT: string = `

 ███████╗ ████████╗ ██╗   ██╗ ██╗    ██╗  ██████╗ ███████╗ ███╗  ██╗ ███████╗
  ██╔══██╗ ██╔════╝ ██║   ██║ ██║    ██║ ██╔═══██╗ ██╔══██╗ ██║ ██╔╝ ██╔════╝
  ██║  ██║ █████╗   ██║   ██║ ██║ █╗ ██║ ██║   ██║ ██████╔╝ █████╔╝  ███████╗
  ██║  ██║ ██╔══╝   ╚██╗ ██╔╝ ██║███╗██║ ██║   ██║ ██╔══██╗ ██╔═██╗  ╚════██║
 ███████╔╝ ███████╗  ╚████╔╝  ╚███╔███╔╝ ╚██████╔╝ ██║  ██║ ██║  ██╗ ███████║
  ╚═════╝  ╚══════╝   ╚═══╝    ╚══╝╚══╝   ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚══════╝`;

export class ScreenSize {
    public static readonly width: number = global?.screen?.availWidth;
    public static readonly height: number = global?.screen?.availHeight;
}

export class Scenes {
    public static readonly LoadScene: string = 'LoadScene';
    public static readonly MenuScene: string = 'MenuScene';
    public static readonly GameScene: string = 'GameScene';
}

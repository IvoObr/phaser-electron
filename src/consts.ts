export const ASCII_TEXT: string =
    `

██████╗ ███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗███████╗
██╔══██╗██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝██╔════╝
██║  ██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ ███████╗
██║  ██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗ ╚════██║
██████╔╝███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗███████║
╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                           
`;

export class Screen {
    public static readonly width: number = global?.screen?.availWidth;
    public static readonly height: number = global?.screen?.availHeight;
}

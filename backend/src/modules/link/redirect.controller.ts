import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {LinkService} from "./link.service";

@Controller()
export class RedirectController {
    constructor(private readonly linkService: LinkService) {}

    @Get(':shortLink')
    async redirect(@Param('shortLink') shortLink: string, @Res() res: Response) {
        const originalLink = await this.linkService.findLinkByShort(shortLink);
        if (originalLink) {
            return res.redirect(originalLink.link);
        } else {
            return res.status(404).send('Link not found');
        }
    }
}

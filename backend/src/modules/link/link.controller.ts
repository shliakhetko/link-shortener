import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {LinkService} from "./link.service";
import {CreateLinkDto} from "./dto/create-link.dto";
import {UpdateLinkDto} from "./dto/update-link.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";

@Controller('link')
export class LinkController {
    constructor(private readonly linkService: LinkService) {}

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createLinkDto: CreateLinkDto) {
        return this.linkService.create(createLinkDto);
    }
    
    @Get()
    findAll() {
        return this.linkService.findAll();
    }

    @Get(':shortLink')
    async redirectToFullLink(@Param('shortLink') shortLink: string): Promise<any> {
        const link = await this.linkService.findLinkByShort(shortLink);

        if (!link) {
            throw new NotFoundException('ShortLink not found');
        }

        return {
            statusCode: 302,
            url: link.link, // This should redirect the user to the full link
        };
    }
    
    @Get('id/:id')  
    findOne(@Param('id') id: string) {
        return this.linkService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
        return this.linkService.update(id, updateLinkDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.linkService.remove(id);
    }
}
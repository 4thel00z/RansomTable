import {Range} from "./Range";
import {Table} from "./Table";
import "jquery";

export class Paginator {
    private static VISIBLE_ROWS_PER_PAGE: number = 17;
    private _currentPage: number = 0;
    private _visibility: Range = new Range(0, 0);
    private _count: number = 0;
    private pageBounds: Range = new Range(0, 0);
    private container: JQuery;
    private paginatorBar: JQuery;
    private arrows: Arrows;

    public static classes: any = {
        container: "-js-rt-paginatorContainer",
        paginatorBar: "-js-rt-paginatorBar",
        item: "-js-rt-paginatorItem",
        activeItem: "-js-rt-activePaginatorItem",
        first: "-js-rt-paginatorFirst",
        last: "-js-rt-paginatorLast",
        arrowRight: "-js-rt-paginatorArrowRight",
        arrowLeft: "-js-rt-paginatorArrowLeft",
        doubleArrowLeft: "-js-rt-paginatorDoubleArrowLeft",
        doubleArrowRight: "-js-rt-paginatorDoubleArrowRight"
    };

    constructor(table: Table) {
        this.container = $("<div>").addClass(Paginator.classes.container);
        this.paginatorBar = $("<span>").addClass(Paginator.classes.paginatorBar);
        this._count = table.getCount();
        this.update();
        this.render();
    }

    set count(value: number) {
        this._count = value;
    }

    private getPageBarElements(): Array<JQuery> {
        const pageBar: Array<JQuery> = [];
        for (let i = this.pageBounds.min; i < this.pageBounds.max; i++) {
            const pageBarElement = $("<span>").text(i).addClass(Paginator.classes.item);

            if (i === this.pageBounds.min) {
                pageBarElement.addClass(Paginator.classes.first);
            }
            if (i === this.pageBounds.max - 1) {
                pageBarElement.addClass(Paginator.classes.last);
            }
            if (i === this.currentPage) {
                pageBarElement.addClass(Paginator.classes.activeItem);
            }

            pageBarElement.click((event: Event) => {});

            pageBar.push(pageBarElement);
        }

        return pageBar;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(value: number) {
        this._currentPage = value;
    }

    get visibility(): Range {
        return this._visibility;
    }


    public update() {
        this._visibility.min = this._currentPage * Paginator.VISIBLE_ROWS_PER_PAGE;
        this._visibility.max = (this._currentPage + 1) * Paginator.VISIBLE_ROWS_PER_PAGE;
        this.pageBounds.max = this._count < 0 ? 0 : this._count / Paginator.VISIBLE_ROWS_PER_PAGE;
    }

    render(): JQuery {
        this.container.empty();
        this.paginatorBar.empty();
        this.arrows = Arrow.getArrows(this);
        this.paginatorBar.append(this.arrows.doubleLeft.element);
        this.paginatorBar.append(this.arrows.left.element);
        this.getPageBarElements().forEach(pageBarElement => pageBarElement.appendTo(this.paginatorBar));
        this.paginatorBar.append(this.arrows.right.element);
        this.paginatorBar.append(this.arrows.doubleRight.element);
        this.container.append(this.paginatorBar);
        return this.container;
    }

    public isVisible(i: number): boolean {
        return this.visibility.isLeftInclusive(i);
    }
}

interface Arrows {
    left: Arrow, right: Arrow, doubleRight: Arrow, doubleLeft: Arrow
}

class Arrow {

    private _element: JQuery;
    private onClick: (event: Event) => boolean;
    private static leftClasses = ["fa", "fa-angle-left", Paginator.classes.item, Paginator.classes.arrowLeft].join(" ");
    private static rightClasses = ["fa", "fa-angle-right", Paginator.classes.item, Paginator.classes.arrowRight].join(" ");
    private static doubleLeftClasses = ["fa", "fa-angle-double-left", Paginator.classes.item, Paginator.classes.doubleArrowRight].join(" ");
    private static doubleRightClasses = ["fa", "fa-angle-double-right", Paginator.classes.item, Paginator.classes.doubleArrowRight].join(" ");

    get element(): JQuery {
        return this._element;
    }

    set element(value: JQuery) {
        this._element = value;
    }

    private constructor(onClick: (event: Event) => boolean, type: ArrowType) {
        this.onClick = onClick;

        switch (type) {
            case ArrowType.DOUBLELEFT:
                this.doubleLeftArrow();
                break;
            case ArrowType.LEFT:
                this.leftArrow();
                break;
            case ArrowType.RIGHT:
                this.rightArrow();
                break;
            case ArrowType.DOUBLERIGHT:
                this.doubleRightArrow();
                break;
        }

    }

    private leftArrow(): Arrow {
        this.element = $("<i>").addClass(Arrow.leftClasses).click(this.onClick);
        return this;
    }

    private rightArrow(): Arrow {
        this.element = $("<i>").addClass(Arrow.rightClasses).click(this.onClick);
        return this;
    }

    private doubleLeftArrow(): Arrow {
        this.element = $("<i>").addClass(Arrow.doubleLeftClasses).click(this.onClick);
        return this;
    }

    private doubleRightArrow(): Arrow {
        this.element = $("<i>").addClass(Arrow.doubleRightClasses).click(this.onClick);
        return this;
    }


    private static generateClickHandler(paginator: Paginator, delta: number | "max"|"min") {

        return function (event: Event): boolean {

            const currentPage = paginator.currentPage;
            let nextCurrentpage: number;


            if (delta === "max" || delta === "min") {
                nextCurrentpage = delta === "max" ? paginator.visibility.max - 1 : paginator.visibility.min;
            }
            else {
                nextCurrentpage = currentPage + delta;
            }

            if (paginator.visibility.isLeftInclusive(nextCurrentpage)) {
                paginator.currentPage = nextCurrentpage;
                paginator.update();
            }

            return false;
        }

    }

    public static getArrows(paginator: Paginator): Arrows {

        const onLeft = Arrow.generateClickHandler(paginator, -1);
        const onRight = Arrow.generateClickHandler(paginator, +1);
        const onDoubleRight = Arrow.generateClickHandler(paginator, "max");
        const onDoubleLeft = Arrow.generateClickHandler(paginator, "min");

        return {
            left: new Arrow(onLeft, ArrowType.LEFT),
            right: new Arrow(onRight, ArrowType.RIGHT),
            doubleLeft: new Arrow(onDoubleLeft, ArrowType.DOUBLELEFT),
            doubleRight: new Arrow(onDoubleRight, ArrowType.DOUBLERIGHT)
        }
    }

}

enum ArrowType{
    RIGHT, LEFT, DOUBLELEFT, DOUBLERIGHT
}


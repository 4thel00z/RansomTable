import {Range} from "../utils/Range";
import {Table} from "../elements/Table";
// declare const $:JQueryStatic;

export class Paginator {
    private static VISIBLE_ROWS_PER_PAGE: number = 17;
    private _currentPage: number = 0;
    private _visibility: Range = new Range(0, 0);
    private _count: number = 0;
    private _pageBounds: Range = new Range(0, 0);
    private container: JQuery;
    private _paginatorBar: JQuery;
    private arrows: Arrows;

    public static classes: any = {
        container: "-js-rt-paginatorContainer",
        paginatorBar: "-js-rt-paginatorBar",
        item: "-js-rt-paginatorItem",
        activeItem: "-js-rt-activePaginatorItem",
        numberItem: "-js-rt-numberPaginatorItem",
        first: "-js-rt-paginatorFirst",
        last: "-js-rt-paginatorLast",
        arrowRight: "-js-rt-paginatorArrowRight",
        arrowLeft: "-js-rt-paginatorArrowLeft",
        doubleArrowLeft: "-js-rt-paginatorDoubleArrowLeft",
        doubleArrowRight: "-js-rt-paginatorDoubleArrowRight"
    };

    constructor(table: Table) {
        this.container = $("<div>").addClass(Paginator.classes.container);
        this._paginatorBar = $("<span>").addClass(Paginator.classes.paginatorBar);

    }

    set count(value: number) {
        this._count = value;
    }

    get count() {
        return this._count;
    }

    private getPageBarElements(table:Table): Array<JQuery> {
        const pageBar: Array<JQuery> = [];
        const self: Paginator = this;
        for (let i = this._pageBounds.min; i < this._pageBounds.max; i++) {

            const pageBarElement = $("<span>").text(i).addClass(Paginator.classes.item).addClass(Paginator.classes.numberItem);
            if (i === this.pageBounds.min) {
                pageBarElement.addClass(Paginator.classes.first);
            }
            if (i === this.pageBounds.max - 1) {
                pageBarElement.addClass(Paginator.classes.last);
            }
            if (i === this.currentPage) {
                pageBarElement.addClass(Paginator.classes.activeItem);
            }
            pageBarElement.click((event: BaseJQueryEventObject) => {
                self.currentPage = i;
                self.update(table);
                table.refreshTableBody();
            });

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

    get paginatorBar(): JQuery {
        return this._paginatorBar;
    }

    get pageBounds(): Range {
        return this._pageBounds;
    }
    
    public update(table: Table) {
        debugger;
        this.count = table.getSize();
        this.visibility.min = this.currentPage * Paginator.VISIBLE_ROWS_PER_PAGE;
        this.visibility.max = (this.currentPage + 1) * Paginator.VISIBLE_ROWS_PER_PAGE;
        this.pageBounds.max = this.count < 0 ? 0 : Math.ceil(this.count / Paginator.VISIBLE_ROWS_PER_PAGE);

        const numberItems = this.paginatorBar.children("." + Paginator.classes.numberItem);
        numberItems.removeClass(Paginator.classes.activeItem);
        $(numberItems[this.currentPage]).addClass(Paginator.classes.activeItem);

    }

    public render(table: Table): JQuery {
        this.container.empty();
        this.paginatorBar.empty();
        this.arrows = Arrow.getArrows(this, table);
        this.paginatorBar.append(this.arrows.doubleLeft.element);
        this.paginatorBar.append(this.arrows.left.element);
        this.getPageBarElements(table).forEach(pageBarElement => pageBarElement.appendTo(this.paginatorBar));
        this.paginatorBar.append(this.arrows.right.element);
        this.paginatorBar.append(this.arrows.doubleRight.element);
        this.container.append(this._paginatorBar);
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
    private onClick: (event: BaseJQueryEventObject) => boolean;
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

    private constructor(onClick: (event: BaseJQueryEventObject) => boolean, type: ArrowType) {
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
        this.element = $("<span>").addClass(Arrow.leftClasses).click(this.onClick);
        return this;
    }

    private rightArrow(): Arrow {
        this.element = $("<span>").addClass(Arrow.rightClasses).click(this.onClick);
        return this;
    }

    private doubleLeftArrow(): Arrow {
        this.element = $("<span>").addClass(Arrow.doubleLeftClasses).click(this.onClick);
        return this;
    }

    private doubleRightArrow(): Arrow {
        this.element = $("<span>").addClass(Arrow.doubleRightClasses).click(this.onClick);
        return this;
    }


    private static generateClickHandler(paginator: Paginator, delta: number | "max"|"min", table: Table) {

        return function (event: BaseJQueryEventObject): boolean {
            debugger;
            const currentPage = paginator.currentPage;
            let nextCurrentpage: number = currentPage;


            if (delta === "max" || delta === "min") {
                nextCurrentpage = delta === "max" ? paginator.pageBounds.max - 1 : paginator.pageBounds.min;
            }
            else if (paginator.pageBounds.isLeftInclusive(currentPage + delta)) {

                nextCurrentpage = currentPage + delta;
            }

            const hasToRefresh: boolean = paginator.currentPage !== nextCurrentpage;
            paginator.currentPage = nextCurrentpage;

            if (hasToRefresh) {
                paginator.update(table);
                table.refreshTableBody();
            }

            return false;
        }

    }

    public static getArrows(paginator: Paginator, table: Table): Arrows {

        const onLeft = Arrow.generateClickHandler(paginator, -1, table);
        const onRight = Arrow.generateClickHandler(paginator, +1, table);
        const onDoubleRight = Arrow.generateClickHandler(paginator, "max", table);
        const onDoubleLeft = Arrow.generateClickHandler(paginator, "min", table);

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


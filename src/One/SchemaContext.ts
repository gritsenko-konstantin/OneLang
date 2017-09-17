import { SchemaTransformer } from "./SchemaTransformer";
import { OneAst as one } from "./Ast";
import { Context as TiContext } from "./Transforms/ResolveIdentifiersTransform";

export class SchemaContext {
    transformer: SchemaTransformer;
    tiContext = new TiContext();

    constructor(public schema: one.Schema) {
        this.transformer = SchemaTransformer.instance;
    }

    ensureTransforms(...transformNames: string[]) {
        this.transformer.ensure(this, ...transformNames);
    }

    addOverlaySchema(schema: one.Schema) {
        for (const glob of Object.values(schema.globals))
            this.tiContext.addLocalVar(glob);
        
        for (const cls of Object.values(schema.classes))
            this.tiContext.classes.addClass(cls);        
    }
}